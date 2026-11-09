# Danh sách việc cần làm HW03

Nguồn chính là đề HW03 mục 4 đến 17, đặc tả EShop mục 8 và chính sách bài tập chung. Đây là danh sách quản lý công việc. Các mục để trống được đánh dấu sau khi có kết quả và bằng chứng tương ứng.

## 0. Chốt phạm vi và chuẩn bị

- [ ] Kiểm tra hạn nộp, giới hạn tệp và hướng dẫn bổ sung trên Moodle.
- [ ] Đọc bài giảng GUI checklist và usability evaluation. Ghi tên bài và mục dùng làm căn cứ.
- [x] Chọn Checkout làm màn hình chính cho C1 và chốt các màn hỗ trợ với nhóm.
- [ ] Sinh viên chốt flow usability end-to-end riêng và đối chiếu với nhóm.
- [ ] Chốt nền tảng, tài khoản demo, fixture và tiêu chí bắt đầu lại giữa các lượt. Ghi commit SUT và biến thể môi trường theo [SETUP.md](SETUP.md).
- [ ] Mở nhật ký AI trước khi thiết kế. Tạo commit riêng khi xong mỗi bước của quy trình, gồm thiết kế checklist, thực thi, báo lỗi, từng buổi usability và phân tích.

Phạm vi nhóm đã phân C1 Web mua hàng. Màn hình chính là Checkout, các màn hỗ trợ gồm Trang chủ, Chi tiết sản phẩm, Giỏ hàng và navbar khách. Đăng nhập chỉ dùng để thiết lập trạng thái cho C1. Task 2 do sinh viên thực hiện riêng.

## 1. GUI Checklist (30 điểm)

- [x] Đọc đặc tả mục 8 và các FR nghiệp vụ liên quan đến màn hình đã chọn.
- [x] Tạo bản nháp, lưu chỉ dẫn, đầu ra và phần mở rộng kỹ thuật trong audit.
- [ ] Sinh viên rà từng mục, sửa mục mơ hồ hoặc trùng, rồi bổ sung các mục AI bỏ sót. Với từng mục bổ sung, ghi lý do AI bỏ sót và căn cứ thực tế hoặc yêu cầu.
- [x] Thiết kế 67 mục riêng biệt trong [Excel checklist](tests/gui-checklist.xlsx), với mã, màn hình, IA, nguồn, fixture, thao tác và expected.
- [x] Bao phủ IA-01 đến IA-04 và đối chiếu FR-21 đến FR-24.
- [x] Chạy toàn bộ trên Chrome. Ghi Passed hoặc Failed, Notes và ảnh lỗi theo GUI-ID.
- [x] Tạo hồ sơ 19 lỗi mới và đăng Issues có ảnh. Nối 17 điều kiện trùng về Issue hiện có trên fork.
- [x] Đối chiếu số mục, kết quả và lỗi của các lượt đã chạy giữa Excel, báo cáo, README và GitHub Issues.

## 2. Usability Evaluation (40 điểm)

### Chuẩn bị

- [ ] Xác định người dùng mục tiêu, mục tiêu nghiên cứu và tiêu chí hoàn thành flow.
- [ ] Viết kịch bản thực tế dưới dạng mục tiêu. Chuẩn bị tài khoản demo, dữ liệu ban đầu, tiêu chí can thiệp khi kẹt và cách đưa hệ thống về cùng trạng thái giữa các buổi.
- [ ] Chọn SUS hoặc UEQ-S. Nếu dùng thang tự thiết kế, ghi lý do và cách tính. Chuẩn bị câu hỏi mở về độ rõ ràng, cách xử lý lỗi, tốc độ và mức độ tin cậy.
- [ ] Tuyển 7 người thật ngoài lớp, phù hợp người dùng mục tiêu. Ưu tiên người ngoài IT hoặc testing. Chuẩn bị danh sách tên và liên hệ xác minh theo đề. Che 4 số giữa đối với số điện thoại hoặc Zalo dạng số. Dùng mã P01 đến P07 trong ghi chú và tài liệu làm việc.
- [ ] Chạy một buổi pilot, ghi phần kịch bản, dữ liệu, thao tác hoặc thời lượng cần sửa, rồi cập nhật trước 7 buổi chính thức.

### Thực hiện 7 buổi

- [ ] Mỗi buổi nói rõ đang đánh giá sản phẩm, mời người tham gia nghĩ thành tiếng và xin phép ghi hình hoặc âm thanh.
- [ ] Quan sát trung lập, chỉ hỗ trợ khi người tham gia thực sự mắc kẹt. Ghi thời điểm, lỗi thao tác, chỗ do dự, lời nhận xét, lần can thiệp và kết quả hoàn thành.
- [ ] Kết thúc bằng phiếu SUS hoặc UEQ-S, sau đó hỏi thêm dựa trên điểm vướng quan sát được. Lưu ghi chú, phản hồi, recording khi có và commit riêng cho từng buổi.

| Buổi | Trạng thái |
|---|---|
| P01 | Chưa chạy |
| P02 | Chưa chạy |
| P03 | Chưa chạy |
| P04 | Chưa chạy |
| P05 | Chưa chạy |
| P06 | Chưa chạy |
| P07 | Chưa chạy |

### Phân tích

- [ ] Tính điểm theo thang đã chọn cho từng người và tổng hợp cả 7. Đính kèm phản hồi gốc và cách tính.
- [ ] Gom các điểm vướng tương tự. Tách bug tái hiện được, vấn đề thiết kế lặp lại và nhận xét đơn lẻ. Xếp mức nghiêm trọng theo ảnh hưởng đến khả năng hoàn thành flow.
- [ ] Liên kết mỗi phát hiện với mã phiên và bằng chứng. Báo bug thật trong Markdown và GitHub Issues, kèm ảnh từng issue.
- [ ] Chuẩn bị bảng 7 người để TA có thể xác minh. TA có thể gọi ngẫu nhiên 2 người. Lưu danh sách liên hệ và recording trong vùng riêng, đưa bản phù hợp vào gói Moodle.

## 3. Cross-browser và cross-platform (20 điểm)

- [ ] Chuẩn bị Chrome, Firefox và Safari hoặc Android Chrome. Có thể dùng Expo Go trên điện thoại thật thay một trong ba nền tảng nếu đã ánh xạ các mục kiểm thử phù hợp giữa web và mobile.
- [ ] Ưu tiên BrowserStack hoặc LambdaTest trial. Nếu hết trial, dùng dịch vụ cloud khác hoặc thiết bị thật theo điều kiện của đề. Kiểm tra truy cập được cả web và API localhost trước khi chạy.
- [ ] Thực hiện Task 1 trên ít nhất 3 nền tảng thực tế. Ghi browser và phiên bản, OS, thiết bị, URL và kết quả cho cùng mã checklist. Ghi rõ giới hạn áp dụng khi đổi sang Expo Go.
- [ ] Lưu ảnh cross-platform thật. Ảnh thể hiện môi trường và URL của SUT theo đề. Hiển thị email sinh viên ở overlay và chuẩn bị thông tin MSSV, họ tên trên form để đáp ứng cả mục 6 và mục 11.
- [ ] Tổng hợp khác biệt theo nền tảng. Gắn ảnh cho mục Failed và GitHub Issue liên quan. Lưu ảnh xác nhận nền tảng riêng với ảnh lỗi theo từng mục.

## 4. Agent Skills (10 điểm)

- [x] Viết skill tái sử dụng cho thiết kế, review và thực thi GUI checklist.
- [x] Viết skill tái sử dụng cho lập kế hoạch, ghi nhận và phân tích usability.
- [x] Quay demo workflow GUI trên Checkout và bàn giao bản MP4.
- [ ] Sinh viên review đầu ra và cập nhật link YouTube thực tế.

## 5. Audit, báo cáo và nộp

- [ ] Hoàn tất AI Audit Report theo từng tương tác với tên công cụ, ngày giờ, prompt, output, phần sinh viên sửa và lý do. Khai báo công cụ và phạm vi dùng AI, liên hệ Bloom-AI G9.3 và G9.4.
- [ ] Viết AI Critique 200 đến 300 từ về lỗi, thiên lệch hoặc phần AI bỏ sót, nguyên nhân và bài học cộng tác.
- [ ] Xuất Markdown và PDF cho báo cáo chính, AI Audit Report và AI Critique. Đưa bảng tổng hợp Excel vào báo cáo Markdown.
- [ ] Rà gói nộp có Excel hơn 40 mục, test summary, bug report và ảnh trên Issues, kịch bản, ghi chú, phản hồi thang đo, danh sách 7 người, phát hiện xếp hạng, recording khi có và ảnh cross-platform.
- [ ] Cập nhật test summary, link video và tự chấm theo rubric 30, 40, 20, 10 trong README.
- [ ] Rà lịch sử từng bước, rồi xuất `git log --date=iso-strict --pretty=fuller` vào `git-commit-log.txt`.
- [ ] Đóng gói theo mẫu `23120262_HW03_AI_GUIUsability_<DiemBaChuSo>.zip`. Kiểm tra giới hạn tối đa 20 tệp, 20 MB mỗi tệp theo chính sách chung và xác nhận lại tại Moodle.
- [ ] Mở thử ZIP, PDF, Excel và liên kết. Nộp Moodle đúng hạn và kiểm tra bản đã nộp. Chuẩn bị giải thích quy trình trong 5 đến 7 phút nếu được gọi vấn đáp.
