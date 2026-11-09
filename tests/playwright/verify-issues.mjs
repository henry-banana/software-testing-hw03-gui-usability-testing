import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const data = new URL('../../evidence/github-issues/',import.meta.url);
const registry = JSON.parse(await fs.readFile(new URL('verified.json',data),'utf8'));
const browser = await chromium.launch({channel:'chrome'});
const context = await browser.newContext({viewport:{width:1220,height:850}});
const page = await context.newPage();
page.setDefaultTimeout(12000);
const table = [
  '# Bằng chứng GitHub Issues C1','',
  'Mỗi Issue mới đã được đọc lại theo tiêu đề, nhãn và nội dung. Các ảnh dưới đây chụp trang GitHub và phần Evidence sau khi xác minh ảnh đính kèm tải được.',
  'Ảnh lỗi SUT gốc giữ trong thư mục screenshots. Các điều kiện đã có trên fork được liệt kê riêng trong bug index.',
  '',
  '| Finding | Issue | Ảnh đính kèm | Trang Issue | Evidence |','|---|---|---|---|---|',
];
try {
  for (const [id,entry] of Object.entries(registry)) {
    const response = await page.goto(entry.url,{waitUntil:'domcontentloaded'});
    assert.equal(response.status(),200,entry.url);
    const title = page.getByText(entry.title,{exact:true}).first();
    await title.waitFor();
    const top = id + '-issue.jpg';
    const bottom = id + '-evidence.jpg';
    await page.screenshot({path:fileURLToPath(new URL(top,data)),type:'jpeg',quality:74});
    const evidence = page.getByRole('heading',{name:'Evidence',exact:true});
    await evidence.waitFor();
    await evidence.evaluate((node) => node.scrollIntoView({block:'start'}));
    const image = page.locator('img[alt*="Ảnh màn hình khi tái hiện"], img[src*="user-attachments/assets"]').first();
    await image.waitFor();
    await image.evaluate((node) => node.decode());
    await page.screenshot({path:fileURLToPath(new URL(bottom,data)),type:'jpeg',quality:74});
    table.push('| ' + id + ' | [#' + entry.number + '](' + entry.url + ') | [Ảnh SUT](' + entry.attachment +
      ') | [Tiêu đề](' + top + ') | [Ảnh hiển thị](' + bottom + ') |');
    await fs.writeFile(new URL('README.md',data),table.join('\n') + '\n');
    console.log(id,entry.url,'image decoded');
  }
} finally {
  await browser.close();
}
