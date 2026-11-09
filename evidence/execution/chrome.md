# Kết quả C1 trên Google Chrome

| Trường | Giá trị |
|---|---|
| Browser | Google Chrome 157.0.8103.38 |
| OS | Windows 10.0.26300 |
| SUT | 85af3ba875c88283615e22cb108f13e2fccaf0e9 |
| URL | http://localhost:5173 |
| Viewport | 1366 x 900 |
| Playwright | 1.65.0 |
| Thời gian UTC | 2026-11-09T19:40:07.370Z đến 2026-11-09T19:40:35.864Z |
| Passed | 31 |
| Failed | 36 |
| Blocked | 0 |

Các lượt dùng browser context độc lập. GUI-043 và GUI-064 giữ request thật để quan sát trạng thái đang chờ.
JSON cùng tên giữ nguyên actual và thời điểm từng lượt. Các ảnh bên dưới là ảnh lỗi chưa thêm thông tin nhận diện.

| Mã | Kết quả | Quan sát | Ảnh lỗi |
|---|---|---|---|
| GUI-001 | Failed | ["Danh sách sản phẩm","Hiển thị 5 sản phẩm"] | [Ảnh](../../evidence/screenshots/chrome/GUI-001.png) |
| GUI-002 | Passed | ["iPhone 15 Pro Max"] |  |
| GUI-003 | Failed | [] | [Ảnh](../../evidence/screenshots/chrome/GUI-003.png) |
| GUI-004 | Failed | [] | [Ảnh](../../evidence/screenshots/chrome/GUI-004.png) |
| GUI-005 | Failed | ["30,000,000 VND","28,000,000 VND","45,000,000 VND","6,000,000 VND","4,000,000 VND"] | [Ảnh](../../evidence/screenshots/chrome/GUI-005.png) |
| GUI-006 | Passed | 30,000,000 ₫ |  |
| GUI-007 | Passed | ["30,000,000 ₫","30,000,000 ₫"] |  |
| GUI-008 | Passed | Tổng thanh toán: 30,000,000 ₫ |  |
| GUI-009 | Passed | rgb(37, 99, 235) |  |
| GUI-010 | Failed | rgb(22, 163, 74) | [Ảnh](../../evidence/screenshots/chrome/GUI-010.png) |
| GUI-011 | Passed | ["rgba(0, 0, 0, 0)","rgb(239, 68, 68)"] |  |
| GUI-012 | Failed | rgb(22, 163, 74) | [Ảnh](../../evidence/screenshots/chrome/GUI-012.png) |
| GUI-013 | Failed | rgb(249, 115, 22) | [Ảnh](../../evidence/screenshots/chrome/GUI-013.png) |
| GUI-014 | Passed | Tìm |  |
| GUI-015 | Passed | ["Áp dụng","Xác Nhận Thanh Toán"] |  |
| GUI-016 | Passed | {"type":"number","value":"1"} |  |
| GUI-017 | Failed | {"value":"0","feedback":"Đã thêm","rows":["iPhone 15 Pro Max30,000,000 ₫00 ₫Xóa"]} | [Ảnh](../../evidence/screenshots/chrome/GUI-017.png) |
| GUI-018 | Failed | {"value":"-1","feedback":"Đã thêm","rows":["iPhone 15 Pro Max30,000,000 ₫-1-30,000,000 ₫Xóa"]} | [Ảnh](../../evidence/screenshots/chrome/GUI-018.png) |
| GUI-019 | Failed | {"value":"1.5","feedback":"Đã thêm","rows":["iPhone 15 Pro Max30,000,000 ₫130,000,000 ₫Xóa"]} | [Ảnh](../../evidence/screenshots/chrome/GUI-019.png) |
| GUI-020 | Failed | {"value":"","feedback":"Đã thêm","rows":["iPhone 15 Pro Max30,000,000 ₫NaNNaN ₫Xóa"]} | [Ảnh](../../evidence/screenshots/chrome/GUI-020.png) |
| GUI-021 | Failed | {"editable":true,"before":"30000000","after":"1"} | [Ảnh](../../evidence/screenshots/chrome/GUI-021.png) |
| GUI-022 | Failed | {"text":["Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"],"errorY":438,"buttonY":388} | [Ảnh](../../evidence/screenshots/chrome/GUI-022.png) |
| GUI-023 | Passed | {"disabled":true} |  |
| GUI-024 | Passed | {"disabled":true} |  |
| GUI-025 | Passed | {"enabled":true} |  |
| GUI-026 | Failed | - spinbutton: "1" | [Ảnh](../../evidence/screenshots/chrome/GUI-026.png) |
| GUI-027 | Passed | - textbox "Nhập mã giảm giá..." |  |
| GUI-028 | Passed | http://localhost:5173/cart |  |
| GUI-029 | Passed | /login |  |
| GUI-030 | Passed | /register |  |
| GUI-031 | Failed | {"current":null,"classes":"hover:underline"} | [Ảnh](../../evidence/screenshots/chrome/GUI-031.png) |
| GUI-032 | Failed | Giỏ hàng | [Ảnh](../../evidence/screenshots/chrome/GUI-032.png) |
| GUI-033 | Failed | {"navigation":[]} | [Ảnh](../../evidence/screenshots/chrome/GUI-033.png) |
| GUI-034 | Failed | {"navigation":[]} | [Ảnh](../../evidence/screenshots/chrome/GUI-034.png) |
| GUI-035 | Failed | {"navigation":[]} | [Ảnh](../../evidence/screenshots/chrome/GUI-035.png) |
| GUI-036 | Passed | http://localhost:5173/ |  |
| GUI-037 | Failed | {"label":"← Mua tiếp","href":"/"} | [Ảnh](../../evidence/screenshots/chrome/GUI-037.png) |
| GUI-038 | Passed | {"url":"http://localhost:5173/login","message":"Bạn cần đăng nhập để thanh toán!"} |  |
| GUI-039 | Failed | {"url":"http://localhost:5173/checkout","payVisible":true} | [Ảnh](../../evidence/screenshots/chrome/GUI-039.png) |
| GUI-040 | Failed | [{"product":"iPhone 15 Pro Max","alt":""},{"product":"Samsung Galaxy S24 Ultra","alt":""},{"product":"MacBook Pro M3","alt":""},{"product":"Tai nghe AirPods Pro 2","alt":""},{"product":"Bàn phím cơ Keychron Q1","alt":""}] | [Ảnh](../../evidence/screenshots/chrome/GUI-040.png) |
| GUI-041 | Passed | iPhone 15 Pro Max |  |
| GUI-042 | Failed | Danh sách sản phẩm Tìm Kết quả tìm kiếm cho: HW03NOITEM2026 | [Ảnh](../../evidence/screenshots/chrome/GUI-042.png) |
| GUI-043 | Failed | Danh sách sản phẩm Tìm | [Ảnh](../../evidence/screenshots/chrome/GUI-043.png) |
| GUI-044 | Passed | ["iPhone 15 Pro Max"] |  |
| GUI-045 | Failed | {"rendered":["HW03"],"body":"Danh sách sản phẩm Tìm Kết quả tìm kiếm cho: HW03"} | [Ảnh](../../evidence/screenshots/chrome/GUI-045.png) |
| GUI-046 | Passed | {"title":"iPhone 15 Pro Max","img":"https://placehold.co/300x300/png?text=iPhone+15","body":"iPhone 15 Pro Max  30,000,000 ₫  Điện thoại cao cấp của Apple  Số lượng: Thêm vào giỏ hàng"} |  |
| GUI-047 | Failed | [] | [Ảnh](../../evidence/screenshots/chrome/GUI-047.png) |
| GUI-048 | Failed | {"feedback":"Thêm vào giỏ hàng","rows":[]} | [Ảnh](../../evidence/screenshots/chrome/GUI-048.png) |
| GUI-049 | Failed | {"before":"Giỏ hàng Đăng nhập Đăng ký","after":"Giỏ hàng Đăng nhập Đăng ký","notices":[]} | [Ảnh](../../evidence/screenshots/chrome/GUI-049.png) |
| GUI-050 | Failed | ["Sản phẩm","Giá","Số lượng","Thành tiền","Thao tác"] | [Ảnh](../../evidence/screenshots/chrome/GUI-050.png) |
| GUI-051 | Failed | ["Xóa"] | [Ảnh](../../evidence/screenshots/chrome/GUI-051.png) |
| GUI-052 | Failed | {"rows":["iPhone 15 Pro Max30,000,000 ₫130,000,000 ₫Xóa","iPhone 15 Pro Max30,000,000 ₫130,000,000 ₫Xóa"],"quantities":["1","1"]} | [Ảnh](../../evidence/screenshots/chrome/GUI-052.png) |
| GUI-053 | Failed | Giỏ Hàng Sản phẩm	Giá	Số lượng	Thành tiền	Thao tác iPhone 15 Pro Max	30,000,000 ₫	1	30,000,000 ₫	Xóa Tổng tạm tính: 30,000,000 ₫ ← Mua tiếp Tiến hành thanh toán | [Ảnh](../../evidence/screenshots/chrome/GUI-053.png) |
| GUI-054 | Failed | {"custom":0,"rows":0} | [Ảnh](../../evidence/screenshots/chrome/GUI-054.png) |
| GUI-055 | Passed | ["Giỏ hàng của bạn đang trống"] |  |
| GUI-056 | Failed | {"matches":0} | [Ảnh](../../evidence/screenshots/chrome/GUI-056.png) |
| GUI-057 | Passed | ["iPhone 15 Pro Max x 1 - 30,000,000 ₫"] |  |
| GUI-058 | Passed | Tổng thanh toán: 30,000,000 ₫ |  |
| GUI-059 | Passed | Xác Nhận Đơn Hàng Sản phẩm: iPhone 15 Pro Max x 1 - 30,000,000 ₫ Tổng tiền thanh toán (VND): Mã Giảm Giá Áp dụng  Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa  Tổng thanh toán: 30,000,000 ₫ Xác Nhận Thanh Toán |  |
| GUI-060 | Passed | Xác Nhận Đơn Hàng Sản phẩm: iPhone 15 Pro Max x 1 - 30,000,000 ₫ Tổng tiền thanh toán (VND): Mã Giảm Giá Áp dụng  Mã giảm giá đã hết hạn  Tổng thanh toán: 30,000,000 ₫ Xác Nhận Thanh Toán |  |
| GUI-061 | Passed | Xác Nhận Đơn Hàng Sản phẩm: iPhone 15 Pro Max x 1 - 30,000,000 ₫ Tổng tiền thanh toán (VND): Mã Giảm Giá Áp dụng  ✅ Áp dụng thành công! Giảm 50,000 ₫  Tiết kiệm: 50,000 ₫  Thành tiền: 29,950,000 ₫  Tổng thanh toán: 29,950,000 ₫ Xác Nhận Thanh Toán |  |
| GUI-062 | Failed | Xác Nhận Đơn Hàng Sản phẩm: iPhone 15 Pro Max x 1 - 30,000,000 ₫ Tổng tiền thanh toán (VND): Mã Giảm Giá Áp dụng  ✅ Áp dụng thành công! Giảm 10%  Tiết kiệm: -270,000,000 ₫  Thành tiền: 300,000,000 ₫  Tổng thanh toán: 300,000,000 ₫ Xác Nhận Thanh Toán | [Ảnh](../../evidence/screenshots/chrome/GUI-062.png) |
| GUI-063 | Passed | Xác Nhận Đơn Hàng Sản phẩm: iPhone 15 Pro Max x 1 - 30,000,000 ₫ Tổng tiền thanh toán (VND): Mã Giảm Giá Áp dụng Tổng thanh toán: 30,000,000 ₫ Xác Nhận Thanh Toán |  |
| GUI-064 | Passed | {"visible":true,"button":["Đang xử lý..."]} |  |
| GUI-065 | Passed | {"status":200,"message":["Thanh toán thành công!"]} |  |
| GUI-066 | Failed | {"status":200,"rows":1,"body":"Giỏ Hàng Sản phẩm\tGiá\tSố lượng\tThành tiền\tThao tác iPhone 15 Pro Max\t30,000,000 ₫\t1\t30,000,000 ₫\tXóa Tổng tạm tính: 30,000,000 ₫ ← Mua tiếp Tiến hành thanh toán"} | [Ảnh](../../evidence/screenshots/chrome/GUI-066.png) |
| GUI-067 | Passed | {"status":200,"url":"http://localhost:5173/"} |  |
