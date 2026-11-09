# Thiết kế GUI checklist C1

Màn hình chính là Checkout. Các màn hỗ trợ là Trang chủ, Chi tiết sản phẩm, Giỏ hàng và navbar khách.
Căn cứ là đề HW03 mục 6 và FR-05 đến FR-09, FR-21 đến FR-24 của EShop. Đăng nhập chỉ dùng để thiết lập trạng thái.
Tiêu chí bổ sung về tên truy cập được phân biệt với yêu cầu giao diện ghi trực tiếp trong SRS.

## Fixture dùng chung

- **blank**. Browser context mới. Chưa mở trang.
- **home**. Khách, browser context mới. Trang chủ đã tải 5 sản phẩm seed.
- **detail**. Khách. Từ Trang chủ mở iPhone 15 Pro Max, giá seed 30.000.000 đồng.
- **empty**. Khách, browser context mới. Mở Giỏ hàng trống.
- **cart**. Khách. Thêm một iPhone từ Trang chủ rồi mở Giỏ hàng.
- **checkout**. Đăng nhập bằng tài khoản demo. Thêm một iPhone từ Trang chủ, vào Giỏ hàng rồi bấm Tiến hành thanh toán.
- **guestCheckout**. Browser context mới, khách chưa đăng nhập. Mở trực tiếp đường dẫn /checkout.

## Checklist

| Mã | IA | Màn hình | Nguồn | Fixture | Thao tác | Mong đợi |
|---|---|---|---|---|---|---|
| GUI-001 | IA-01 | Trang chủ | FR-21; FR-05 | home | Đếm h1 sau khi catalog tải xong. | Đúng một h1 mô tả danh sách sản phẩm. |
| GUI-002 | IA-01 | Chi tiết sản phẩm | FR-21 | detail | Đếm h1 khi mở sản phẩm seed. | Đúng một h1 mô tả sản phẩm. |
| GUI-003 | IA-01 | Giỏ hàng | FR-21 | cart | Đếm h1 trong giỏ có một dòng. | Đúng một h1 mô tả giỏ hàng. |
| GUI-004 | IA-01 | Checkout | FR-21 | checkout | Đếm h1 khi xác nhận đơn có sản phẩm. | Đúng một h1 mô tả nội dung Checkout. |
| GUI-005 | IA-01 | Trang chủ | FR-21; FR-05 | home | Đọc giá của toàn bộ thẻ sản phẩm seed. | Tất cả giá có dấu phân cách hàng nghìn và ký hiệu ₫. |
| GUI-006 | IA-01 | Chi tiết sản phẩm | FR-21 | detail | Đọc giá của sản phẩm seed. | Giá có dấu phân cách hàng nghìn và ký hiệu ₫. |
| GUI-007 | IA-01 | Giỏ hàng | FR-21 | cart | Đọc đơn giá và thành tiền của dòng giỏ. | Cả hai dùng ký hiệu ₫ và phân cách hàng nghìn. |
| GUI-008 | IA-01 | Checkout | FR-21 | checkout | Đọc chuỗi tổng thanh toán cuối form. | Tổng có dấu phân cách hàng nghìn và ký hiệu ₫. |
| GUI-009 | IA-01 | Trang chủ | FR-21 | home | Đọc màu nền tính toán của nút Tìm. | Nút submit tìm kiếm có màu xanh dương. |
| GUI-010 | IA-01 | Chi tiết sản phẩm | FR-21 | detail | Đọc màu nền nút Thêm vào giỏ hàng. | Nút mua hàng có màu xanh dương. |
| GUI-011 | IA-01 | Giỏ hàng | FR-21 | cart | Đọc màu chữ và nền của nút Xóa. | Hành động xóa có màu đỏ ở chữ hoặc nền. |
| GUI-012 | IA-01 | Checkout | FR-21 | checkout | Đọc màu nền nút xác nhận thanh toán. | Nút mua hàng có màu xanh dương. |
| GUI-013 | IA-01 | Checkout | FR-21 | checkout | Đọc màu nền nút Áp dụng sau khi nhập mã. | Nút submit mã giảm giá có màu xanh dương. |
| GUI-014 | IA-01 | Trang chủ | FR-21 | home | Đặt focus vào ô tìm kiếm rồi bấm Tab. | Focus chuyển tới nút Tìm liền sau ô. |
| GUI-015 | IA-01 | Checkout | FR-21 | checkout | Điền mã hợp lệ về cú pháp. Tab từ ô mã qua Áp dụng rồi Xác Nhận Thanh Toán. | Focus lần lượt đi qua hai nút đúng thứ tự. |
| GUI-016 | IA-02 | Chi tiết sản phẩm | FR-06 | detail | Đọc kiểu và giá trị mặc định của ô số lượng. | Ô số lượng hỗ trợ nhập số và mặc định 1. |
| GUI-017 | IA-02 | Chi tiết sản phẩm | FR-06 | detail | Nhập số 0. Bấm Thêm vào giỏ tối đa hai lần vì lượt đầu có thể bị bỏ qua. Kiểm tra giỏ. | Sản phẩm không được thêm với số 0. |
| GUI-018 | IA-02 | Chi tiết sản phẩm | FR-06 | detail | Nhập số âm. Bấm Thêm vào giỏ tối đa hai lần vì lượt đầu có thể bị bỏ qua. Kiểm tra giỏ. | Sản phẩm không được thêm với số âm. |
| GUI-019 | IA-02 | Chi tiết sản phẩm | FR-06 | detail | Nhập số thập phân. Bấm Thêm vào giỏ tối đa hai lần vì lượt đầu có thể bị bỏ qua. Kiểm tra giỏ. | Sản phẩm không được thêm với số thập phân. |
| GUI-020 | IA-02 | Chi tiết sản phẩm | FR-06 | detail | Nhập giá trị rỗng. Bấm Thêm vào giỏ tối đa hai lần vì lượt đầu có thể bị bỏ qua. Kiểm tra giỏ. | Sản phẩm không được thêm với giá trị rỗng. |
| GUI-021 | IA-02 | Checkout | FR-08 | checkout | Kiểm tra khả năng sửa ô tổng tiền trước khi gửi đơn. | Tổng tiền được tính từ giỏ và người dùng không thể sửa trực tiếp. |
| GUI-022 | IA-02 | Checkout | FR-22 | checkout | Áp dụng mã không tồn tại. So sánh vị trí thông báo với nút Áp dụng. | Lỗi của ô mã được đặt phía trên nút Áp dụng. |
| GUI-023 | IA-02 | Checkout | FR-09 | checkout | Quan sát nút Áp dụng khi ô mã trống. | Nút Áp dụng bị vô hiệu khi mã trống. |
| GUI-024 | IA-02 | Checkout | FR-09 | checkout | Nhập chỉ dấu cách vào ô mã. | Nút Áp dụng vẫn bị vô hiệu khi không có mã thực. |
| GUI-025 | IA-02 | Checkout | FR-08; FR-09 | checkout | Để ô mã trống và kiểm tra nút xác nhận. | Mã là tùy chọn. Nút xác nhận thanh toán vẫn khả dụng. |
| GUI-026 | IA-02 | Chi tiết sản phẩm | FR-22 | detail | Đối chiếu tên nhãn số lượng được công bố cho điều khiển. | Tên số lượng được liên kết với ô nhập. |
| GUI-027 | IA-02 | Checkout | FR-22 | checkout | Đối chiếu tên nhãn mã giảm giá được công bố cho điều khiển. | Ô nhập có tên truy cập mô tả mã giảm giá. |
| GUI-028 | IA-03 | Navbar khách | FR-23 | home | Bấm link Giỏ hàng khi chưa đăng nhập. | Link dẫn tới /cart. |
| GUI-029 | IA-03 | Navbar khách | FR-23 | home | Kiểm tra đích link Đăng nhập khi chưa đăng nhập. | Link trỏ đến /login. |
| GUI-030 | IA-03 | Navbar khách | FR-23 | home | Kiểm tra đích link Đăng ký khi chưa đăng nhập. | Link trỏ đến /register. |
| GUI-031 | IA-03 | Navbar khách | FR-23 | cart | Quan sát trạng thái link Giỏ hàng ở /cart. | Navbar có dấu hiệu phân biệt link đang được chọn. |
| GUI-032 | IA-03 | Navbar khách | FR-23 | cart | Thêm một sản phẩm và đọc nội dung link Giỏ hàng. | Link hiển thị badge số lượng 1. |
| GUI-033 | IA-03 | Chi tiết sản phẩm | FR-23 | detail | Tìm đường dẫn phân cấp trong nội dung Chi tiết. | Có breadcrumb thể hiện đường dẫn từ Trang chủ. |
| GUI-034 | IA-03 | Giỏ hàng | FR-23 | cart | Tìm đường dẫn phân cấp trong Giỏ hàng có sản phẩm. | Có breadcrumb thể hiện đường dẫn từ Trang chủ. |
| GUI-035 | IA-03 | Checkout | FR-23 | checkout | Tìm đường dẫn phân cấp trong Checkout có sản phẩm. | Có breadcrumb thể hiện đường dẫn từ Trang chủ. |
| GUI-036 | IA-03 | Giỏ hàng | FR-07 | empty | Bấm Tiếp tục mua sắm từ giỏ trống. | Trở về Trang chủ và danh sách sản phẩm tải được. |
| GUI-037 | IA-03 | Giỏ hàng | FR-07 | cart | Đọc nhãn và đích link mua tiếp trong giỏ có sản phẩm. | Link về / có nhãn Tiếp tục mua sắm. |
| GUI-038 | IA-03 | Giỏ hàng | FR-08 | cart | Bấm Tiến hành thanh toán khi là khách. Ghi dialog nếu có. | Khách được đưa tới đăng nhập trước khi thanh toán. |
| GUI-039 | IA-03 | Checkout | FR-08 | guestCheckout | Mở trực tiếp /checkout khi chưa đăng nhập. | Khách không truy cập được form xác nhận thanh toán đang hoạt động. |
| GUI-040 | IA-04 | Trang chủ | FR-05; FR-24 | home | Đọc alt của toàn bộ ảnh sản phẩm. | Mỗi ảnh có alt mô tả sản phẩm tương ứng. |
| GUI-041 | IA-04 | Chi tiết sản phẩm | FR-24 | detail | Đọc alt ảnh lớn ở trang chi tiết. | Alt mô tả sản phẩm đang mở. |
| GUI-042 | IA-04 | Trang chủ | FR-05 | home | Tìm chuỗi HW03NOITEM2026 và chờ API trả 0 kết quả. | Trang hiện thông báo không có kết quả. |
| GUI-043 | IA-04 | Trang chủ | FR-05 | blank | Giữ request catalog ở trạng thái đang chờ rồi đọc UI. | Trang chủ có phản hồi đang tải trước khi sản phẩm xuất hiện. |
| GUI-044 | IA-04 | Trang chủ | FR-05 | home | Tìm từ iPhone và đọc danh sách sau phản hồi. | Chỉ có sản phẩm khớp từ khóa. |
| GUI-045 | IA-04 | Trang chủ | FR-05 | home | Nhập và tìm chuỗi thử vô hại &lt;b&gt;HW03&lt;/b&gt;. Kiểm tra vùng hiển thị từ khóa. | Chuỗi được hiển thị như văn bản, không tạo thẻ HTML từ đầu vào. |
| GUI-046 | IA-04 | Chi tiết sản phẩm | FR-06 | detail | Đọc tiêu đề, ảnh, mô tả và giá của sản phẩm seed. | Bốn thông tin sản phẩm hiển thị đúng theo fixture. |
| GUI-047 | IA-04 | Chi tiết sản phẩm | FR-06 | detail | Tìm danh mục của sản phẩm iPhone trên trang chi tiết. | Trang hiển thị danh mục Điện thoại của sản phẩm. |
| GUI-048 | IA-04 | Chi tiết sản phẩm | FR-06; FR-24 | detail | Bấm Thêm vào giỏ một lần, đọc phản hồi rồi mở giỏ. | Một lần bấm có phản hồi và thêm một dòng số lượng 1. |
| GUI-049 | IA-04 | Trang chủ | FR-24 | home | Bấm Thêm vào giỏ trên một thẻ, quan sát navbar và thông báo. | Có toast, đổi nhãn nút hoặc badge tăng. |
| GUI-050 | IA-04 | Giỏ hàng | FR-07 | cart | Đọc tiêu đề các cột của giỏ có hàng. | Có Sản phẩm, Đơn giá, Số lượng, Thành tiền và Thao tác. |
| GUI-051 | IA-04 | Giỏ hàng | FR-07 | cart | Kiểm tra có nút tăng và giảm số lượng tại dòng sản phẩm. | Dòng giỏ cung cấp cả nút + và nút -. |
| GUI-052 | IA-04 | Giỏ hàng | FR-07 | cart | Thêm cùng iPhone lần nữa từ Trang chủ rồi trở lại Giỏ hàng. | Chỉ một dòng cho iPhone và số lượng bằng 2. |
| GUI-053 | IA-04 | Giỏ hàng | FR-07 | cart | Đọc nhãn của dòng tổng giỏ. | Nhãn tổng tiền là Tổng cộng. |
| GUI-054 | IA-04 | Giỏ hàng | FR-07; FR-24 | cart | Bấm Xóa và hủy nếu dialog xuất hiện. Kiểm tra dòng giỏ. | Hiện xác nhận trước khi xóa và hủy giữ dòng trong giỏ. |
| GUI-055 | IA-04 | Giỏ hàng | FR-07; FR-24 | empty | Mở Giỏ hàng với browser context mới. Đọc thông báo rỗng. | Giỏ trống có thông báo rõ ràng. |
| GUI-056 | IA-04 | Giỏ hàng | FR-07; FR-24 | empty | Kiểm tra minh họa trong vùng Giỏ hàng trống. | Có hình minh họa hoặc icon đi kèm thông báo. |
| GUI-057 | IA-04 | Checkout | FR-08 | checkout | Đọc danh sách hàng trên Checkout với giỏ một sản phẩm. | Có tên iPhone và số lượng 1. |
| GUI-058 | IA-04 | Checkout | FR-08 | checkout | Đối chiếu tổng mặc định với giá iPhone trong giỏ một sản phẩm. | Tổng chưa giảm là 30.000.000 đồng. |
| GUI-059 | IA-04 | Checkout | FR-09 | checkout | Áp dụng mã không tồn tại và chờ phản hồi. | Có thông báo mã không tồn tại và không hiện khoản giảm. |
| GUI-060 | IA-04 | Checkout | FR-09 C2 | checkout | Áp dụng EXPIRED ở tổng 30.000.000 đồng. | Có thông báo hết hạn và không hiện khoản giảm. |
| GUI-061 | IA-04 | Checkout | FR-09 | checkout | Áp dụng BIGBUY trên giỏ một iPhone. | Hiện giảm 50.000 và tổng 29.950.000 đồng. |
| GUI-062 | IA-04 | Checkout | FR-09 | checkout | Áp dụng SAVE10 trên giỏ một iPhone. | Hiện giảm 3.000.000 và tổng 27.000.000 đồng. |
| GUI-063 | IA-04 | Checkout | FR-09 | checkout | Áp dụng BIGBUY, sau đó sửa ô mã sang chuỗi khác. | Khoản giảm trước đó biến mất và tổng về 30.000.000 đồng. |
| GUI-064 | IA-04 | Checkout | FR-08 | checkout | Giữ request thanh toán đang chờ và kiểm tra nút xác nhận. | Nút vô hiệu và hiện Đang xử lý trong khi request chưa xong. |
| GUI-065 | IA-04 | Checkout | FR-08 | checkout | Xác nhận một đơn demo không coupon và đọc màn thành công. | Hiện thông báo Thanh toán thành công. |
| GUI-066 | IA-04 | Checkout | FR-08 | checkout | Xác nhận đơn demo rồi mở Giỏ hàng bằng navbar. | Sau khi thanh toán thành công, Giỏ hàng trống. |
| GUI-067 | IA-04 | Checkout | FR-08 | checkout | Sau thành công bấm Quay lại trang chủ. | Trở về Trang chủ và danh sách tải được. |

## Rà soát bản nháp

Bản nháp gốc ở [C1 first draft](../ai-audit/c1-first-draft.md). Bảng dưới ghi phần mở rộng kỹ thuật của Codex.

| Mã | Lý do cần bổ sung hoặc tách |
|---|---|
| GUI-002 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-003 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-004 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-006 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-007 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-008 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-009 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-012 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-013 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-015 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-016 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-017 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-018 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-019 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-020 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-023 | Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được. |
| GUI-024 | Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được. |
| GUI-025 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-026 | Bản nháp chưa xét cách công bố nhãn cho công nghệ hỗ trợ. Tiêu chí bổ sung về khả năng truy cập. |
| GUI-027 | Bản nháp chưa xét tên truy cập của điều khiển. Tiêu chí bổ sung về khả năng truy cập. |
| GUI-029 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-030 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-033 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-034 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-035 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-036 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-037 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-038 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-039 | Bản nháp chỉ xét đường đi qua nút giỏ, thiếu truy cập URL trực tiếp. |
| GUI-041 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-042 | Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được. |
| GUI-043 | Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được. |
| GUI-044 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-045 | Bản nháp thiếu phép thử chuỗi chứa markup theo yêu cầu hiển thị an toàn. |
| GUI-046 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-047 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-049 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-050 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-051 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-052 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-053 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-056 | Bản nháp gộp nhiều trạng thái và màn hình vào một dòng. |
| GUI-057 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-058 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-059 | Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được. |
| GUI-060 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-061 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-062 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-063 | Bản nháp chưa xét chuyển trạng thái sau khi người dùng sửa dữ liệu. |
| GUI-064 | Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được. |
| GUI-065 | Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được. |
| GUI-066 | Bản nháp chỉ nêu quy tắc giao diện tổng quát, chưa đọc FR nghiệp vụ tương ứng. |
| GUI-067 | Bản nháp thiếu điều kiện kích hoạt và phản hồi đo được. |
