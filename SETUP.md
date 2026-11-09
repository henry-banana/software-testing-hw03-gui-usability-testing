# Khởi chạy EShop cho HW03

## Nguồn

- Đề: `../2026.HW03.GUI Usability_En.pdf` và bản Markdown cùng tên.
- Chính sách bài tập: `../../___2026.Homework.Policies.md`.
- SUT: checkout `../eshop-sut/` từ repo [ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut), commit `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Xem mục 8 trong README của SUT.

Giữ thư mục bài nộp và checkout SUT cạnh nhau trong `hw03/`. Các lệnh bên dưới chạy từ thư mục repo bài nộp trên Windows. Máy hiện tại dùng Node `24.16.0` và npm `12.0.2`.

## Backend API và web

Chạy một lần để cài dependencies từ lockfile.

```powershell
Push-Location ../eshop-sut/backend
npm.cmd ci --no-audit --no-fund
Pop-Location

Push-Location ../eshop-sut/frontend-web
npm.cmd ci --no-audit --no-fund
Pop-Location
```

Nếu npm 12 báo chặn script cài SQLite, chạy đoạn sau trong `../eshop-sut/backend` để chỉ cho phép bước build `sqlite3` của SUT.

```powershell
$hw03NpmConfig = New-TemporaryFile
try {
    Set-Content -LiteralPath $hw03NpmConfig.FullName -Value 'allow-scripts[]=sqlite3' -Encoding ascii
    npm.cmd rebuild sqlite3 --userconfig=$($hw03NpmConfig.FullName) --no-audit --no-fund
} finally {
    Remove-Item -LiteralPath $hw03NpmConfig.FullName
}
```

Terminal 1 chạy backend trên cổng 3000.

```powershell
& .\scripts\start-backend.ps1
```

Script chạy bản sao của hai file backend trong `.local/backend/`. SUT tự seed lại database mỗi lần server khởi động. Dùng thời điểm reset có chủ đích và ghi rõ fixture của từng lượt.

Terminal 2 chạy web trên cổng 5173.

```powershell
Set-Location ../eshop-sut/frontend-web
npm.cmd run dev -- --port 5173 --strictPort
```

- Web: `http://localhost:5173/`. API kiểm tra nhanh: `http://localhost:3000/api/products`.
- Tài khoản demo user: `test@eshop.com` với mật khẩu `Test1234!` theo seed.
- Nếu phạm vi cần Admin, cài dependencies trong `../eshop-sut/frontend-admin` và chạy `npm.cmd run dev -- --port 5174 --strictPort`. Tài khoản seed là `admin@eshop.com` với mật khẩu `Admin123!`.
- Nếu dùng cloud test, cấu hình tunnel cho cả cổng web 5173 và API 3000. Web gọi API bằng `localhost:3000`. Kiểm tra trang tải được sản phẩm trước khi bắt đầu thu bằng chứng.
- Nếu chọn Expo Go, SUT dùng Expo SDK 54 và khai báo API bằng IP LAN cố định trong `frontend-mobile/App.js`. Kiểm tra tương thích Expo Go, cấu hình API theo IP LAN của máy chạy backend trên bản sao dành cho test, rồi ghi thay đổi cấu hình trong báo cáo. Điện thoại và máy tính cần kết nối được với nhau.

## Ghi nhận mỗi lượt chạy

Ghi commit SUT, mã nền tảng, OS và thiết bị, browser hoặc Expo, URL, ngày giờ và dữ liệu đầu vào. Kiểm tra lại trạng thái đăng nhập, giỏ hàng và lượt dùng coupon trước mỗi lần chạy lại. Dùng hồ sơ browser sạch hoặc tài khoản demo riêng cho từng người khi cần.
