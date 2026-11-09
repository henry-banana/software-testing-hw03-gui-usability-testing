# Bản nháp AI đầu tiên cho C1

## Chỉ dẫn dùng để tạo bản nháp

Từ FR-21 đến FR-24 và FR-05 đến FR-09, đề xuất danh sách kiểm tra GUI ban đầu cho trang chủ, chi tiết sản phẩm, giỏ hàng, Checkout và navbar khách. Nhóm theo IA. Chỉ lập giả thuyết kiểm thử. Ghi những tiêu chí có thể quan sát được qua web.

## Đầu ra bản nháp

| IA | Mục đề xuất ban đầu |
|---|---|
| IA-01 | Một tiêu đề chính cho từng trang |
| IA-01 | Giá có đơn vị tiền và phân cách hàng nghìn |
| IA-01 | Màu hành động chính và hành động xóa nhất quán |
| IA-01 | Tab đi qua các điều khiển theo thứ tự trên xuống dưới, trái sang phải |
| IA-02 | Ô số lượng nhận số nguyên dương |
| IA-02 | Ô tổng tiền Checkout chỉ đọc |
| IA-02 | Lỗi mã giảm giá xuất hiện gần điều khiển áp dụng |
| IA-03 | Navbar cho khách dẫn tới đúng trang |
| IA-03 | Trang con có breadcrumb và link giỏ có badge |
| IA-04 | Sau khi thêm giỏ có phản hồi trực quan |
| IA-04 | Khi xóa dòng giỏ có xác nhận và giỏ rỗng có minh họa |
| IA-04 | Ảnh sản phẩm có alt mô tả và trang có trạng thái tải |

## Rà soát kỹ thuật của Codex

Tách từng kỳ vọng có thể thất bại riêng thành một dòng. Bản nháp dùng từ gần cho vị trí lỗi mã, trong khi FR-22 yêu cầu trên nút submit. Sửa tiêu chí thành so sánh vị trí cụ thể. Email, mật khẩu và chỉ báo quên mật khẩu thuộc C2 nên dùng luồng đăng nhập chỉ làm setup. Giữ mã giảm giá là trường tùy chọn và không yêu cầu dấu sao cho trường đó.

Các cột Origin và Gap trong thiết kế sau ghi phần mở rộng từ bản nháp. Các mục mở rộng do Codex đề xuất trong phiên này. Phần sửa đổi do sinh viên xác nhận sẽ được ghi riêng khi có review.
