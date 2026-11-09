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
