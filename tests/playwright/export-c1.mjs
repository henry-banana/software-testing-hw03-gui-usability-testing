import fs from 'node:fs/promises';
import { cases } from './c1-cases.mjs';

const root = new URL('../../',import.meta.url);
const fixtures = {
  blank: 'Browser context mới. Chưa mở trang.',
  home: 'Khách, browser context mới. Trang chủ đã tải 5 sản phẩm seed.',
  detail: 'Khách. Từ Trang chủ mở iPhone 15 Pro Max, giá seed 30.000.000 đồng.',
  empty: 'Khách, browser context mới. Mở Giỏ hàng trống.',
  cart: 'Khách. Thêm một iPhone từ Trang chủ rồi mở Giỏ hàng.',
  checkout: 'Đăng nhập bằng tài khoản demo. Thêm một iPhone từ Trang chủ, vào Giỏ hàng rồi bấm Tiến hành thanh toán.',
  guestCheckout: 'Browser context mới, khách chưa đăng nhập. Mở trực tiếp đường dẫn /checkout.',
};
const read = (file) => fs.readFile(new URL(file,root),'utf8');
const write = (file,data) => fs.writeFile(new URL(file,root),data);
const cell = (value) => String(value).replaceAll('|','\\|').replace(/\r?\n/g,' ')
  .replace(/[—–·]/g,'-').replace(/[✅←]/gu,'').replaceAll('<','&lt;').replaceAll('>','&gt;');
const pretty = (actual) => typeof actual === 'string' ? actual : JSON.stringify(actual);

export { fixtures };
if (process.argv[2] === 'design') {
  const overview = [
    '# Thiết kế GUI checklist C1',
    '',
    'Màn hình chính là Checkout. Các màn hỗ trợ là Trang chủ, Chi tiết sản phẩm, Giỏ hàng và navbar khách.',
    'Căn cứ là đề HW03 mục 6 và FR-05 đến FR-09, FR-21 đến FR-24 của EShop. Đăng nhập chỉ dùng để thiết lập trạng thái.',
    'Tiêu chí bổ sung về tên truy cập được phân biệt với yêu cầu giao diện ghi trực tiếp trong SRS.',
    '',
    '## Fixture dùng chung',
    '',
    ...Object.entries(fixtures).map(([key,text]) => '- **' + key + '**. ' + text),
    '',
    '## Checklist',
    '',
    '| Mã | IA | Màn hình | Nguồn | Fixture | Thao tác | Mong đợi |',
    '|---|---|---|---|---|---|---|',
    ...cases.map((row) => '| ' + [row.id,row.ia,row.screen,row.source,row.fixture,row.steps,row.expected].map(cell).join(' | ') + ' |'),
    '',
    '## Rà soát bản nháp',
    '',
    'Bản nháp gốc ở [C1 first draft](../ai-audit/c1-first-draft.md). Bảng dưới ghi phần mở rộng kỹ thuật của Codex.',
    '',
    '| Mã | Lý do cần bổ sung hoặc tách |',
    '|---|---|',
    ...cases.filter(({gap}) => gap).map(({id,gap}) => '| ' + id + ' | ' + cell(gap) + ' |'),
    '',
  ];
  await write('tests/c1-checklist.md',overview.join('\n'));
}

if (process.argv[2] === 'execution') {
  for (const platform of ['chrome','firefox','webkit']) {
    let run;
    try { run = JSON.parse(await read('evidence/execution/' + platform + '.json')); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    const counts = run.results.reduce((out,{status}) => ({...out,[status]:(out[status] ?? 0)+1}),{});
    const lines = [
      '# Kết quả C1 trên ' + run.browser,
      '',
      '| Trường | Giá trị |','|---|---|',
      '| Browser | ' + run.browser + ' ' + run.version + ' |',
      '| OS | ' + run.os + ' |',
      '| SUT | ' + run.baseline + ' |',
      '| URL | ' + run.webUrl + ' |',
      '| Viewport | ' + run.viewport.width + ' x ' + run.viewport.height + ' |',
      '| Playwright | ' + run.playwright + ' |',
      '| Thời gian UTC | ' + run.startedAt + ' đến ' + run.finishedAt + ' |',
      '| Passed | ' + (counts.Passed ?? 0) + ' |',
      '| Failed | ' + (counts.Failed ?? 0) + ' |',
      '| Blocked | ' + (counts.Blocked ?? 0) + ' |',
      '',
      'Các lượt dùng browser context độc lập. GUI-043 và GUI-064 giữ request thật để quan sát trạng thái đang chờ.',
      'JSON cùng tên giữ nguyên actual và thời điểm từng lượt. Các ảnh bên dưới là ảnh lỗi chưa thêm thông tin nhận diện.',
      '',
      '| Mã | Kết quả | Quan sát | Ảnh lỗi |',
      '|---|---|---|---|',
      ...run.results.map((row) => {
        const actual = cell(pretty(row.actual)).replace(/\\n/g,' ').trim();
        const image = row.screenshot ? '[Ảnh](../../' + row.screenshot + ')' : '';
        return '| ' + [row.id,row.status,actual,image].join(' | ') + ' |';
      }),
      '',
    ];
    await write('evidence/execution/' + platform + '.md',lines.join('\n'));
  }
}
