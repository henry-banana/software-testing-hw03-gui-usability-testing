import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { cases } from './c1-cases.mjs';
import { fixtures } from './export-c1.mjs';

const root = new URL('../../',import.meta.url);
const read = (file) => fs.readFile(new URL(file,root),'utf8');
const write = (file,data) => fs.writeFile(new URL(file,root),data);
const triage = JSON.parse(await read('bugs/c1-triage.json'));
const chrome = JSON.parse(await read('evidence/execution/chrome.json'));
const firefox = JSON.parse(await read('evidence/execution/firefox.json'));
const runs = [chrome,firefox];
const clean = (value) => String(value).replace(/[—–·]/g,'-').replace(/✅\s*/g,'');
const all = new Set(Object.keys(triage.existing));
let published = {};
try { published = JSON.parse(await read('evidence/github-issues/verified.json')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }

for (const [id,bug,title,severity,impact] of triage.new) {
  assert.ok(!all.has(id),'Triage ID appears twice: ' + id);
  all.add(id);
  const test = cases.find((item) => item.id === id);
  const results = runs.map((run) => run.results.find((row) => row.id === id));
  assert.ok(results.every((row) => row?.status === 'Failed' && row.screenshot), 'Unconfirmed issue ' + id);
  const [row] = results;
  const heading = '[' + test.ia + '] ' + title;
  const oracle = test.source + (id === 'GUI-026' ? ' và [WCAG 2.2 SC 4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) (tiêu chí bổ sung).' : '.');
  const details = [
    '## Summary','', title + '.','',
    '- Finding: ' + bug + '.',
    '- Checklist: ' + id + '.',
    '- Requirement: ' + oracle,
    '- Severity: ' + severity + '.',
    '',
    '## Environment','',
    '- EShop baseline: ' + chrome.baseline + '.',
    ...runs.map(({browser,version,os}) => '- ' + browser + ' ' + version + ', ' + os + '.'),
    '- Viewport: ' + chrome.viewport.width + ' x ' + chrome.viewport.height + '.',
    '- SUT: ' + row.url,
    '',
    '## Preconditions','', fixtures[test.fixture],'',
    '## Steps to reproduce','',
    ...test.steps.split(/(?<=\.)\s+/u).map((step,index) => (index+1) + '. ' + clean(step)),
    '',
    '## Expected result','', test.expected,'',
    '## Actual result','',
    '~~~text',clean(typeof row.actual === 'string' ? row.actual : JSON.stringify(row.actual,null,2)),'~~~','',
    '## Impact','',impact,'',
    '## Reproducibility','',
    'Tái hiện ở Chrome và Firefox trong các lượt C1 có context riêng. ' +
      (id === 'GUI-043' ? 'Lượt kiểm giữ request catalog thật ở trạng thái chờ để quan sát giao diện.' : 'Kết quả được ghi theo ID trên từng nền tảng.'),
    '',
    '## Evidence','',
    '![Ảnh màn hình khi tái hiện ' + id + ' trên Chrome](../' + row.screenshot + ')',
    '',
  ];
  const issue = published[bug]?.url;
  await write('bugs/' + bug + '.md', ['# ' + bug + ' - ' + heading,'',...(issue ? ['GitHub Issue: ' + issue,''] : []),...details].join('\n'));
}

const failures = chrome.results.filter((row) => row.status === 'Failed');
assert.deepEqual([...all].sort(),failures.map((row) => row.id).sort(),'Triage must cover each Chrome failure.');
const index = [
  '# Bug reports C1','',
  'Mỗi mục dưới đây có bằng chứng tái hiện mới ở HW03. Các dòng trùng điều kiện với fork dẫn về Issue hiện có.',
  'Đã đối chiếu các Issue #161 đến #175, tương ứng nhóm BUG-15 đến BUG-29, cùng các Issue FR-08 và FR-09 liên quan.',
  '',
  '| Checklist | Mã hoặc Issue | Trạng thái |',
  '|---|---|---|',
  ...triage.new.map(([id,bug]) => '| ' + id + ' | [' + bug + '](' + bug + '.md) | ' +
    (published[bug] ? '[Đã đăng](' + published[bug].url + ')' : 'Bản nháp') + ' |'),
  ...Object.entries(triage.existing).map(([id,number]) =>
    '| ' + id + ' | [Fork #' + number + '](https://github.com/tkob-team/eshop-sut/issues/' + number + ') | Trùng điều kiện đã theo dõi |'),
  '',
];
await write('bugs/bug-reports.md',index.join('\n'));
