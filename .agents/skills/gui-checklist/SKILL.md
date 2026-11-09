---
name: gui-checklist
description: Thiết kế GUI checklist từ đặc tả, chạy bằng Playwright trên các nền tảng đã chọn và báo cáo lỗi có bằng chứng.
---

# GUI checklist

1. Chốt màn hình chính, màn hỗ trợ, baseline và phiên bản đặc tả. Lập bảng yêu cầu giao diện theo nhóm, ghi nguồn cho từng kỳ vọng. Dừng thiết kế khi mọi nhóm đã có mục áp dụng được.
2. Lưu prompt và bản nháp AI. Tách kỳ vọng độc lập, bỏ mục trùng, xác minh kỳ vọng với nguồn. Ghi lý do cho từng mục bổ sung và lấy review của sinh viên trước khi ký báo cáo. Một dòng checklist cần ID, màn hình, nguồn, fixture, thao tác và expected.
3. Chạy thử một ca đạt và một ca lỗi để kiểm tra locator, trạng thái fixture và cách lưu ảnh. Dùng context mới và dữ liệu kiểm thử có thể tạo lại. Ghi cách mô phỏng nếu giữ request hoặc thay phản hồi. Chạy cả bộ trên từng nền tảng đủ điều kiện.
4. Lưu actual và thời điểm. Với Failed, ghi lý do và ảnh đúng lúc tái hiện. Phân loại lỗi runner hoặc môi trường là Blocked trong khi điều tra. Đếm riêng số mục và số lượt, ghi tên build thực của browser.
5. Tái hiện từng lỗi và đối chiếu Issues đã mở hoặc đóng. Dùng lại Issue khi điều kiện tái hiện trùng. Với lỗi mới, ghi baseline, môi trường, fixture, bước, expected, actual, tác động và ảnh. Kiểm tra nội dung và ảnh trên trang Issue sau khi đăng.
6. Đối chiếu ID và số liệu giữa Excel, kết quả thô, bug index và báo cáo. Phân biệt phần thực hiện bởi agent với phần đã được sinh viên review. Demo một màn hình từ đối chiếu đặc tả đến kiểm tra một Issue.
