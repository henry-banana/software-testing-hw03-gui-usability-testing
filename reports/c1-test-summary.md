# Test summary C1

## Phạm vi

Checkout là màn hình chính. Tổng cộng kiểm 4 màn hình web và 1 thành phần navbar khách. Login chỉ dùng để thiết lập fixture. Task 2 không nằm trong số liệu C1.

## Theo nền tảng

| Mã | Browser thực tế | OS | Mục | Passed | Failed | Blocked |
|---|---|---|---:|---:|---:|---:|
| P1 | Google Chrome 157.0.8103.38 | Windows 10.0.26300 | 67 | 31 | 36 | 0 |
| P2 | Firefox 159.0 do Playwright cung cấp | Windows 10.0.26300 | 67 | 31 | 36 | 0 |
| P3 | Chưa có môi trường đủ điều kiện | | | | | |
| X1 | WebKit 27.2 do Playwright cung cấp, khảo sát thêm | Windows 10.0.26300 | 67 | 31 | 36 | 0 |

P1 và P2 cộng 134 lượt, 62 Passed và 72 Failed. X1 có 67 lượt, được thống kê riêng. Cả ba lượt ghi nhận cùng tập GUI-ID Passed và Failed. Không suy ra kết quả Safari hoặc Chrome Android từ lượt X1.

## Theo IA

Các số trong hai bảng dưới áp dụng cho mỗi lượt P1, P2 và X1.

| IA | Mục | Passed | Failed |
|---|---:|---:|---:|
| IA-01 | 15 | 8 | 7 |
| IA-02 | 12 | 5 | 7 |
| IA-03 | 12 | 5 | 7 |
| IA-04 | 28 | 13 | 15 |
| Tổng | 67 | 31 | 36 |

## Theo màn hình

| Màn hình hoặc vùng | Mục | Passed | Failed |
|---|---:|---:|---:|
| Trang chủ | 10 | 3 | 7 |
| Chi tiết sản phẩm | 14 | 5 | 9 |
| Giỏ hàng | 14 | 5 | 9 |
| Checkout | 24 | 15 | 9 |
| Navbar khách | 5 | 3 | 2 |

## Đối chiếu lỗi

36 điều kiện Failed được đối chiếu với 36 hồ sơ hoặc Issue. 19 lỗi mới đăng vào repo HW03, với ảnh đã đọc lại trên trang Issue. 17 lỗi trùng điều kiện được dẫn về fork. Những ảnh theo browser của cùng một lỗi được gắn cùng GUI-ID và không làm tăng số lỗi duy nhất.

[Excel](../tests/gui-checklist.xlsx), [Kết quả theo browser](../evidence/README.md), [Bug index](../bugs/bug-reports.md), [Bằng chứng GitHub](../evidence/github-issues/README.md).
