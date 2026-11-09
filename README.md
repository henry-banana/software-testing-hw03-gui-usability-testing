# CSC13003 HW03 - GUI and Usability Testing

| Thông tin | Giá trị |
|---|---|
| Sinh viên | Tống Dương Thái Hòa |
| MSSV | 23120262 |
| Bài tập | HW03-AI, cá nhân |
| EShop SUT | `85af3ba875c88283615e22cb108f13e2fccaf0e9` |
| Phạm vi GUI | C1 Web mua hàng, màn hình chính Checkout |
| Phạm vi usability | Task 2 do sinh viên thực hiện riêng |
| Hạn nộp | Xem link nộp trên Moodle |

## Làm bài

- [Danh sách việc cần làm](TASKS.md) theo đề, từ chốt phạm vi đến nộp Moodle.
- [Bàn giao C1](HANDOFF.md) ghi kết quả, bước bổ sung P3 và các mục sinh viên hoàn tất.
- [Khởi chạy EShop](SETUP.md) trên Windows và chuẩn bị môi trường chạy.
- [Báo cáo chính](23120262_Report.md) ghi thiết kế, quy trình, kết quả và bằng chứng.
- [Excel checklist](tests/gui-checklist.xlsx) ghi thiết kế ở tab Checklist và kết quả theo nền tảng ở tab Execution.
- [Mẫu ghi nhận usability](usability/session-template.md) dùng cho pilot và từng phiên chính thức.
- [Hướng dẫn lưu bằng chứng](evidence/README.md) liên kết ảnh, mục checklist và phiên usability.
- [Nhật ký AI](ai-audit/AI-LOG.md) ghi prompt, output và phần sinh viên kiểm tra.

## Test summary

| Chỉ số | Kết quả |
|---|---|
| Số màn hình GUI đã kiểm thử | 4 màn hình và navbar khách |
| Số flow usability đã đánh giá | Task 2 do sinh viên bổ sung |
| Số mục GUI thiết kế | 67 |
| Số mục GUI đã chạy, Passed, Failed | 67 mục duy nhất, 31 Passed và 36 Failed trên mỗi browser đã chạy |
| Số lượt trên Chrome và Firefox | 134 lượt, 62 Passed và 72 Failed |
| P3 theo đề | Chờ thiết bị hoặc cloud |
| Khảo sát WebKit Windows | 67 lượt, 31 Passed và 36 Failed |
| Số điều kiện lỗi | 36, gồm 19 Issues mới và 17 điều kiện trùng fork |
| Số buổi usability chính thức hoàn tất | Task 2 do sinh viên bổ sung |
| Video demo Agent Skills | Xem [Video demo](Video_Links.md) |

[Test summary theo IA và màn hình](reports/c1-test-summary.md), [Bug index](bugs/bug-reports.md), [Đối chiếu GitHub Issues](evidence/github-issues/README.md), [Git log](git-commit-log.txt).

## Tự đánh giá

| Mục | Tiêu chí | Điểm tối đa | Điểm tự đánh giá | Căn cứ |
|---|---|---:|---:|---|
| 1 | GUI checklist, thực thi và báo lỗi | 30 | | |
| 2 | Kịch bản usability, 7 buổi và phân tích | 40 | | |
| 3 | Cross-browser và cross-platform trên ít nhất 3 nền tảng | 20 | | |
| 4 | Agent Skills | 10 | | |
| | Tổng | 100 | | |
