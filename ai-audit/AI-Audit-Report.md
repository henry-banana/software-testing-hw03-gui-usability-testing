# AI Audit Report HW03

| Mục | Giá trị |
|---|---|
| Sinh viên | Tống Dương Thái Hòa |
| MSSV | 23120262 |
| Bài tập | HW03-AI, C1 Web mua hàng |
| Công cụ | Codex, Playwright, GitHub CLI |
| Trạng thái | Bản để sinh viên rà soát và xác nhận |

## Khai báo

I use AI tools for the following tasks.

Codex hỗ trợ đọc đề, lập kế hoạch, thiết kế checklist, viết runner Playwright, đối chiếu bằng chứng, soạn bug report và tổng hợp tài liệu. Playwright thực hiện các thao tác và thu dữ liệu chạy. GitHub CLI đăng Issue và đọc lại metadata. Sinh viên cung cấp phân bổ nhóm, chốt phạm vi C1 và email dùng riêng cho ảnh nộp. Task 2 do sinh viên thực hiện riêng.

## Kiểm toán từng nhóm đầu ra

| Artifact | Cách kiểm tra | Nhận xét và điều chỉnh |
|---|---|---|
| Bản nháp C1 | Đối chiếu mục 5 và 6 đề HW03, FR-05 đến FR-09 và FR-21 đến FR-24 | Bản nháp gộp các màn hình và thiếu tình huống URL trực tiếp, dữ liệu số lượng sai và trạng thái sau khi sửa coupon. Tách từng tiêu chí và lưu lý do mở rộng theo GUI-ID. |
| Tiêu chí vị trí lỗi | Đối chiếu FR-22 và vị trí hai bounding box | Sửa câu mơ hồ gần nút thành xuất hiện phía trên nút. GUI-022 ghi actual bằng text, vị trí và ảnh. |
| Runner | Chạy thử trên baseline và so sánh DOM thực | Điều chỉnh locator setup đăng nhập sau timeout. Giữ bước đăng nhập làm fixture của C1. |
| Kiểm tra điều hướng | Đối chiếu URL, trạng thái trang và dòng giỏ | Bổ sung điều kiện đợi UI Giỏ hàng xuất hiện sau thay đổi URL để tránh kết quả sớm. |
| Cross-platform | Kiểm phiên bản runtime, JSON và ảnh | Chrome và Firefox được tính trong nhóm nền tảng đề xuất. WebKit Windows ghi là lượt khảo sát riêng. |
| Issues | Rà fork, chạy lại, so nội dung, nhãn và ảnh sau khi đăng | 17 điều kiện đã có Issue được dẫn về fork. 19 điều kiện mới được ghi theo mã riêng. |
| Bằng chứng cá nhân | Phân tách output công khai và bộ ảnh nộp | Ảnh issue dùng tài khoản demo. Ảnh nộp có email và nhận diện do sinh viên cung cấp, lưu ở vùng riêng. |

## Bloom-AI

- **G9.3 Analyse.** Truy vết tiêu chí đến đặc tả, so sánh expected với actual, phân tích chênh lệch và tách giới hạn môi trường khỏi lỗi SUT.
- **G9.4 Collaborate.** Giao AI từng bước, review đầu ra theo bằng chứng, chỉnh runner sau khi chạy thử, kiểm tra lại lỗi và rà Issue trùng.

## Nguồn để đối chiếu

[Nhật ký tương tác](AI-LOG.md), [Bản nháp gốc](c1-first-draft.md), [Checklist chi tiết](../tests/c1-checklist.md), [Kết quả](../evidence/README.md), [Issue index](../bugs/bug-reports.md), [AI Critique](AI-Critique.md).

Phần xác nhận cá nhân được sinh viên điền sau khi xem và kiểm lại đầu ra.
