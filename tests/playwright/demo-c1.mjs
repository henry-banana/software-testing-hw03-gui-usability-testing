import fs from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as pause } from 'node:timers/promises';

const escape = (value) => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');

export async function recordDemo({browser,viewport,repo,cases,controls,checkout}) {
  const folder = path.join(repo,'.local','demo-raw');
  await fs.mkdir(folder,{recursive:true});
  const context = await browser.newContext({viewport,locale:'en-US',recordVideo:{dir:folder,size:viewport}});
  const page = await context.newPage();
  const video = page.video();
  const panel = (heading,body) => page.setContent('<meta charset="utf-8"><style>' +
    'body{margin:0;background:#f1f5fb;color:#163150;font:20px Arial}main{max-width:1080px;margin:55px auto;padding:36px 56px;background:white;border-top:8px solid #1d56a3}h1{font-size:46px;margin:12px 0 20px}p,li{line-height:1.48}table{width:100%;border-collapse:collapse;font:16px Arial}td,th{padding:5px 9px;text-align:left;border-bottom:1px solid #d8e0ea}th{background:#e3ebf6}small{color:#365d8f}</style>' +
    '<main><small>CSC13003 / HW03 / Agent Skill GUI</small><h1>' + escape(heading) + '</h1>' + body + '</main>');
  const caption = (text) => page.evaluate((value) => {
    document.querySelector('[data-demo-caption]')?.remove();
    const element = document.createElement('aside');
    element.dataset.demoCaption = 'yes';
    element.textContent = value;
    element.style.cssText = 'position:fixed;bottom:12px;left:8%;right:8%;padding:15px 22px;background:#11243e;color:white;font:20px Arial;border-radius:6px;z-index:99999;pointer-events:none';
    document.body.appendChild(element);
  },text);
  try {
    await panel('Kiểm thử GUI Checkout',
      '<p>Baseline EShop 85af3ba. Màn hình chính C1 là Checkout.</p>' +
      '<ol><li>Đọc FR-08, FR-09 và FR-21 đến FR-24.</li><li>Gắn từng kỳ vọng với GUI-ID và fixture.</li><li>Chạy Playwright và đọc actual.</li><li>Đối chiếu lỗi và xác minh ảnh Issue.</li></ol>');
    await pause(6500);
    await checkout(page);
    const ui = controls(page);
    await caption('Fixture: tài khoản demo, iPhone 15 Pro Max, số lượng 1. GUI-058 kiểm tổng 30.000.000 đồng.');
    await pause(4500);
    await ui.tryCoupon('BIGBUY');
    await caption('GUI-061 Passed. BIGBUY giảm 50.000 đồng. Tổng hiển thị 29.950.000 đồng.');
    await pause(5200);
    await ui.tryCoupon('HW03NOTACODE');
    await caption('GUI-022 Failed. FR-22 yêu cầu lỗi phía trên nút. Trên màn hình, lỗi xuất hiện dưới nút Áp dụng.');
    await pause(5800);
    const amount = page.locator('main input[type=number]');
    await amount.fill('1');
    await caption('GUI-021 Failed. FR-08 yêu cầu tổng chỉ đọc. Thao tác nhập 1 thay đổi cả ô và tổng hiển thị.');
    await pause(5200);

    const run = JSON.parse(await fs.readFile(path.join(repo,'evidence/execution/chrome.json'),'utf8'));
    const byId = new Map(run.results.map(({id,status}) => [id,status]));
    const checks = cases.filter(({screen}) => screen === 'Checkout');
    for (const group of [checks.slice(0,11),checks.slice(11)]) {
      await panel('Kết quả Checkout trên Chrome','<table><tr><th>Mã</th><th>Yêu cầu</th><th>Kết quả</th></tr>' +
        group.map(({id,expected}) => '<tr><td>' + escape(id) + '</td><td>' + escape(expected) +
          '</td><td>' + escape(byId.get(id)) + '</td></tr>').join('') + '</table>');
      await pause(7200);
    }
    const registry = JSON.parse(await fs.readFile(path.join(repo,'evidence/github-issues/verified.json'),'utf8'));
    const issue = registry['IA02-005'];
    await page.goto(issue.url,{waitUntil:'domcontentloaded'});
    const evidence = page.getByRole('heading',{name:'Evidence',exact:true});
    await evidence.evaluate((element) => element.scrollIntoView({block:'start'}));
    await caption('Issue #' + issue.number + '. Đọc lại yêu cầu, expected, actual và ảnh tái hiện. GUI-021 dẫn về Issue đã có trên fork.');
    await pause(6200);
  } finally {
    await context.close();
    await video.saveAs(path.join(folder,'HW03_C1_Checkout_Demo.webm'));
  }
}
