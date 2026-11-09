# AI-LOG.md

> Cập nhật nhật ký này trong thư mục ai-audit suốt quá trình làm bài.

## Usage

- Add **one entry per interaction** where an AI assistant contributed to the work.
- Preserve the original prompt and AI output or link to the saved output. Record the tool and timestamp.
- Record what you **kept, changed, rejected, and wrote by hand**.
- You remain responsible for all submitted work and should be able to explain it.
- Do not include secrets, API keys, real user data, or another student's work in prompts.
- If your product itself uses an LLM, state what data leaves the system and why that is acceptable.

---

## Entry template

## <YYYY-MM-DD> - <what you were working on>

**Tool:** <Claude Code / GitHub Copilot / Cursor / ChatGPT / other / none>
**Date and time:** <local date, time and timezone>
**Prompt:** <exact prompt>
**AI output:** <original output or path to saved output>
**Kept:** <what you used substantially as suggested>
**Changed:** <what you rewrote or adjusted, and why>
**Rejected:** <what you did not use, and why>
**By hand:** <the parts you wrote or implemented yourself>

---

<!-- Duplicate the entry template above for each AI-assisted task. -->

## 2026-11-10 - Đọc đề và chuẩn bị repo HW03

Công cụ: Codex. Thời gian ghi nhận trong phiên: 02:19 đến 02:25, UTC+07:00.

### Prompt

```text
[@mattpocock-skills](plugin://mattpocock-skills@mattpocock) Xem yêu cầu bài tập [hw03](hw03/) và lên list toàn bộ cần làm và setup cái [software-testing-hw03-gui-usability-testing](hw03/software-testing-hw03-gui-usability-testing/) . Có thể tham khảo từ bên hw02 cũ. liệt kê những cái cần làm đi
```

### Output

- [Danh sách công việc](../TASKS.md), [README](../README.md) và [khung báo cáo](../23120262_Report.md).
- [Hướng dẫn môi trường](../SETUP.md) và [script khởi chạy backend](../scripts/start-backend.ps1).
- [Mẫu Excel](../tests/gui-checklist.xlsx), [mẫu ghi nhận usability](../usability/session-template.md) và [hướng dẫn lưu bằng chứng](../evidence/README.md).
- Kết quả smoke test HTTP của Codex: API trả 5 sản phẩm, web trả HTTP 200 và checksum SQLite gốc khớp.

Sinh viên bổ sung phần đã giữ, đã sửa hoặc đã loại sau khi rà soát đầu ra và chốt phạm vi.

## 2026-11-10 - Lập kế hoạch chi tiết

Công cụ: Codex. Cùng phiên làm việc ngày 2026-11-10, UTC+07:00, trước mốc bắt đầu thực thi 02:32.

### Prompt

> M hãy làm toàn bộ và viết thật chi tiết, có thể xem format chuẩn từ hw02 á, làm hết trừ task 2 vì t sẽ cần chuẩn bị cái này. Dùng playwright á. Những cái issues m post lên cần chuẩn issues quy chuẩn nha. Liệt kê toàn bộ step by step m sẽ làm để hoàn thành t mới giao xem chuẩn chưa.

### Output

Phản hồi kế hoạch gồm 16 bước, lần lượt chốt phạm vi và fixture, thiết kế và chạy checklist, chạy lại trên các nền tảng, kiểm trùng và đăng Issue, rồi bàn giao skills, demo, audit, PDF và Git log. Kế hoạch đề xuất Checkout và tạm chọn các màn hỗ trợ trước khi có phân nhóm. Bản kế hoạch gốc nằm trong phản hồi chat của phiên. [Danh sách việc](../TASKS.md).

## 2026-11-10 - Thực thi C1

Công cụ: Codex. Bắt đầu ghi nhận thực thi lúc 02:32, UTC+07:00. Thời điểm từng lượt nằm trong log thực thi.

### Prompt và dữ liệu điều phối

> Làm hết đi, phải chuẩn và viết thật chi tiết, lấy hw02 làm quy chuẩn. Còn màn hình thì xem cái chia như sau:

Tin nhắn kèm phân bổ C1 Mua hàng, C2 Tài khoản, C3 Admin, các flow U1 đến U4 và lưu ý kiểm trùng BUG-15 đến BUG-29 trên fork. Sinh viên cung cấp email để gắn trên ảnh nộp và xác nhận chưa có môi trường cho nền tảng thứ ba. Dữ liệu định danh trong ảnh được lưu trong bộ riêng.

### Output

- [Bản nháp và chỉ dẫn](c1-first-draft.md), [checklist chi tiết](../tests/c1-checklist.md), [Excel](../tests/gui-checklist.xlsx).
- [Runner](../tests/playwright/run-c1.mjs), [kết quả theo nền tảng](../evidence/README.md), [test summary](../reports/c1-test-summary.md).
- [Danh mục bug](../bugs/bug-reports.md), [ảnh và link Issue](../evidence/github-issues/README.md).
- [Báo cáo chính](../23120262_Report.md), [AI Audit Report](AI-Audit-Report.md), [AI Critique](AI-Critique.md), [Agent Skill GUI](../.agents/skills/gui-checklist/SKILL.md).

Phần kỹ thuật trên do Codex thực hiện. Sinh viên rà soát và bổ sung xác nhận theo rubric trước khi nộp.
