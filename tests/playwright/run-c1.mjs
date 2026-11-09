import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium, firefox, webkit } from 'playwright';
import { cases } from './c1-cases.mjs';

const repo = fileURLToPath(new URL('../../', import.meta.url));
const sut = path.resolve(repo, '../eshop-sut');
const webUrl = 'http://localhost:5173';
const apiUrl = 'http://localhost:3000';
const runName = process.argv[2] ?? 'chrome';
const configurations = {
  chrome: [chromium, { channel: 'chrome' }, 'Google Chrome'],
  firefox: [firefox, {}, 'Firefox (Playwright build)'],
  webkit: [webkit, {}, 'WebKit (Playwright build, exploratory)'],
};
const [engine, options, browserName] = configurations[runName] ?? [];
assert.ok(engine, 'Expected chrome, firefox, or webkit.');
const selection = new Set(process.argv.slice(3));
const selected = cases.filter((test) => selection.size === 0 || selection.has(test.id));
assert.ok(selected.length > 0 && (selection.size === 0 || selection.size === selected.length), 'Unknown GUI ID.');

const backend = path.join(sut, 'backend');
const web = path.join(sut, 'frontend-web');
const runtime = path.join(repo, '.local', 'runtime-' + runName);
const published = selection.size === 0 ? path.join(repo, 'evidence') : path.join(repo, '.local/recheck');
const shots = path.join(published, 'screenshots', runName);
const execution = path.join(published, 'execution');
const privateShots = path.join(repo, '.local/submission-evidence', runName);
const email = process.env.HW03_STUDENT_EMAIL;
const identity = process.env.HW03_STUDENT_NAME_AND_ID;
const osName = os.platform() === 'win32' ? 'Windows ' + os.release() : os.type() + ' ' + os.release();
const viewport = { width: 1366, height: 900 };
const product = 'iPhone 15 Pro Max';
const now = () => new Date().toISOString();
const hash = async (file) => createHash('sha256').update(await fs.readFile(file)).digest('hex');
const db = path.join(backend, 'database.sqlite');
const baselineHash = await hash(db);
const localPath = (file) => path.relative(repo, file).split(path.sep).join('/');

function service(cwd, args, env = process.env) {
  const child = spawn(process.execPath, args, { cwd, env, stdio: ['ignore','inherit','inherit'], windowsHide: true });
  child.on('error', (error) => console.error(error));
  return child;
}

async function ready(url, child) {
  for (let attempt = 0; attempt < 35; attempt++) {
    assert.equal(child.exitCode, null, 'Service exited early: ' + url);
    const response = await fetch(url, { signal: AbortSignal.timeout(1000) }).catch(() => null);
    if (response?.ok) return response;
    await delay(250);
  }
  throw new Error('Service did not become ready: ' + url);
}

function controls(page, capture = async () => {}) {
  const homeReady = () => page.getByRole('heading',{name:product,exact:true}).waitFor();
  const card = () => page.locator('main .grid > div').filter({has:page.getByRole('heading',{name:product,exact:true})});
  const addHome = () => card().getByRole('button',{name:'Thêm vào giỏ',exact:true}).click();
  const openCart = async () => {
    await page.locator('header nav').getByRole('link',{name:/Giỏ hàng/}).click();
    await page.waitForURL('**/cart');
  };
  const proceed = () => page.getByRole('button',{name:'Tiến hành thanh toán'});
  const search = () => page.getByPlaceholder('Tìm kiếm...');
  const pay = () => page.getByRole('button',{name:'Xác Nhận Thanh Toán'});
  const coupon = () => page.getByPlaceholder('Nhập mã giảm giá...');
  const apply = () => page.getByRole('button',{name:'Áp dụng',exact:true});
  const doSearch = async (query) => {
    const response = page.waitForResponse((res) => res.url().includes('/api/products?search='));
    await search().fill(query); await search().press('Enter');
    const answer = await response;
    assert.equal(answer.status(),200);
    const data = await answer.json();
    if (data.length === 0) {
      await page.waitForFunction(() => document.querySelectorAll('main .grid > div').length === 0);
    } else {
      await page.waitForFunction((length) => document.querySelectorAll('main .grid > div').length === length,data.length);
    }
  };
  const tryCoupon = async (code) => {
    await coupon().fill(code);
    const response = page.waitForResponse((res) => res.url().endsWith('/api/apply-coupon'));
    await apply().click();
    const status = (await response).status();
    await page.getByRole('button',{name:'Áp dụng',exact:true}).waitFor();
    return status;
  };
  const submit = async () => {
    const response = page.waitForResponse((res) => res.url().endsWith('/api/checkout') && res.request().method() === 'POST');
    await pay().click();
    const status = (await response).status();
    if (status === 200) await page.getByText('Thanh toán thành công!').waitFor();
    return status;
  };
  const pending = async (pattern, action, observe) => {
    let release;
    let seen;
    const gate = new Promise((resolve) => { release = resolve; });
    const observed = new Promise((resolve) => { seen = resolve; });
    const hold = async (route) => {
      seen();
      await gate;
      await route.continue().catch(() => {});
    };
    await page.route(pattern,hold);
    try {
      if (typeof action === 'string') await page.goto(webUrl + action);
      else await action();
      await Promise.race([observed,delay(3000).then(() => { throw new Error('Expected network request did not start'); })]);
      const observation = await observe();
      if (!observation[0]) await capture();
      return observation;
    } finally {
      release();
      await page.unroute(pattern,hold);
    }
  };
  return {
    page, product, homeReady, card, addHome, openCart, proceed, search, pay, coupon, apply, doSearch, tryCoupon, submit, pending,
    qty: () => page.locator('main input[type=number]'),
    detailAdd: () => page.getByRole('button',{name:/Thêm vào giỏ hàng|Đã thêm/}),
    total: () => page.getByText(/^Tổng thanh toán:/),
    bg: (loc) => loc.evaluate((el) => getComputedStyle(el).backgroundColor),
  };
}

async function fixture(ui, name) {
  const { page, homeReady, card, addHome, openCart, proceed } = ui;
  if (name === 'blank') return;
  if (name === 'empty' || name === 'guestCheckout') {
    await page.goto(webUrl + (name === 'empty' ? '/cart' : '/checkout'));
    await page.locator('main > div').first().waitFor();
    return;
  }
  if (name === 'checkout') {
    await page.goto(webUrl + '/login');
    const form = page.locator('main form').filter({has:page.getByRole('button',{name:'Sign In'})});
    await form.locator('input').nth(0).fill('test@eshop.com');
    await form.locator('input').nth(1).fill('Test1234!');
    await page.getByRole('button',{name:'Sign In'}).click();
    await page.waitForURL(webUrl + '/');
  } else {
    await page.goto(webUrl + '/');
  }
  await homeReady();
  if (name === 'home') return;
  if (name === 'detail') {
    await card().getByRole('link',{name:'Xem chi tiết'}).click();
    await page.getByRole('heading',{level:1,name:product,exact:true}).waitFor();
    return;
  }
  await addHome(); await openCart();
  await page.locator('tbody tr').first().waitFor();
  if (name === 'checkout') {
    await proceed().click();
    await page.waitForURL('**/checkout');
    await ui.pay().waitFor();
  }
}

async function screenshot(page, file, banner) {
  if (banner) {
    await page.evaluate((text) => {
      const box = document.createElement('aside');
      box.dataset.hw03Capture = 'true';
      box.textContent = text;
      box.style.cssText = 'position:fixed;bottom:6px;right:6px;padding:7px 12px;z-index:2147483647;background:#13233a;color:white;font:13px Arial;border-radius:4px;pointer-events:none';
      document.body.appendChild(box);
    }, banner);
  }
  try {
    await page.screenshot({path:file, timeout:3000});
  } finally {
    if (banner) await page.locator('[data-hw03-capture]').evaluate((el) => el.remove()).catch(() => {});
  }
}

await Promise.all([runtime,shots,execution,privateShots].map((directory) => fs.mkdir(directory,{recursive:true})));
for (const port of [apiUrl, webUrl]) {
  const existing = await fetch(port,{signal:AbortSignal.timeout(600)}).catch(() => null);
  assert.ok(!existing,'Expected an unused port: ' + port);
}
for (const file of ['server.js','database.js']) await fs.copyFile(path.join(backend,file),path.join(runtime,file));
const api = service(runtime,['server.js'],{...process.env,NODE_PATH:path.join(backend,'node_modules')});
const webServer = service(web,['node_modules/vite/bin/vite.js','--port','5173','--strictPort']);
let browser;
try {
  const products = await (await ready(apiUrl + '/api/products',api)).json();
  assert.equal(products.length,5);
  await ready(webUrl,webServer);
  browser = await engine.launch(options);
  const version = browser.version();
  const results = [];
  const newContext = () => browser.newContext({viewport,locale:'en-US'});
  const banner = (page, id) => [id,browserName + ' ' + version,osName,page.url(),email].filter(Boolean).join(' | ');

  for (const test of selected) {
    const startedAt = now();
    const context = await newContext();
    const page = await context.newPage();
    page.setDefaultTimeout(4500);
    const result = { id:test.id, startedAt, platform:runName };
    const capture = async () => {
      const file = path.join(shots,test.id + '.png');
      await screenshot(page,file);
      result.screenshot = localPath(file);
      if (email) await screenshot(page,path.join(privateShots,test.id + '.png'),banner(page,test.id));
    };
    const ui = controls(page,capture);
    try {
      await fixture(ui,test.fixture);
      const [pass,actual] = await test.run(ui);
      result.status = pass ? 'Passed' : 'Failed';
      result.actual = actual;
      if (!pass && !result.screenshot) await capture();
    } catch (error) {
      result.status = 'Blocked';
      result.actual = String(error.message).split('\n').slice(0,6).join('\n');
    } finally {
      result.url = page.url();
      result.finishedAt = now();
      results.push(result);
      await context.close();
    }
    console.log(test.id, result.status, JSON.stringify(result.actual).slice(0,200));
  }

  if (selection.size === 0) {
    const context = await newContext();
    const page = await context.newPage();
    const ui = controls(page);
    await fixture(ui,'checkout');
    if (email) {
      await screenshot(page,path.join(privateShots,'platform-checkout.png'),banner(page,'C1 Checkout'));
      if (identity) {
        await page.goto(webUrl + '/register');
        await page.locator('main input').first().fill(identity);
        await screenshot(page,path.join(privateShots,'platform-student-form.png'),banner(page,'Đối chiếu thông tin sinh viên'));
      }
    }
    await context.close();
  }
  assert.equal(await hash(db),baselineHash,'Original database changed.');
  const out = {
    platform:runName,browser:browserName,version,os:osName,viewport,webUrl,
    node:process.version,playwright:'1.65.0',locale:'en-US',
    baseline:'85af3ba875c88283615e22cb108f13e2fccaf0e9',
    originalSqliteSha256:baselineHash,startedAt:results[0].startedAt,finishedAt:now(),results,
  };
  await fs.writeFile(path.join(execution,runName + '.json'),JSON.stringify(out,null,2) + '\n');
  console.log(browserName,version,results.reduce((count,{status}) => ({...count,[status]:(count[status] ?? 0)+1}),{}));
} finally {
  await browser?.close();
  api.kill();
  webServer.kill();
}
