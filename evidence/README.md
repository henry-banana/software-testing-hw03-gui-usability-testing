# Bằng chứng kiểm thử

## Kết quả C1

| Mã | Browser | Báo cáo từng mục | Dữ liệu thô | Ảnh lỗi |
|---|---|---|---|---|
| P1 | Google Chrome | [Markdown](execution/chrome.md) | [JSON](execution/chrome.json) | [Ảnh](screenshots/chrome/) |
| P2 | Firefox của Playwright | [Markdown](execution/firefox.md) | [JSON](execution/firefox.json) | [Ảnh](screenshots/firefox/) |
| P3 | Chờ Safari thật, Android Chrome thật hoặc Expo Go | | | |
| X1 | WebKit Windows, khảo sát thêm | [Markdown](execution/webkit.md) | [JSON](execution/webkit.json) | [Ảnh](screenshots/webkit/) |

Ảnh gốc được đặt theo GUI-ID và browser. Ảnh có email và form nhận diện được tách vào bộ bàn giao riêng. Xem [đối chiếu Issues](github-issues/README.md) để phân biệt ảnh lỗi SUT và ảnh hiển thị trên GitHub.

## Quy ước lưu bằng chứng

- Lưu ảnh mục Failed theo mã mục và nền tảng, ví dụ `GUI-001-P1.png`. Ghi mã tương ứng trong Excel và báo cáo.
- Ghi trình duyệt, OS, thiết bị, URL và ngày chạy cho từng nền tảng. Gắn ảnh của từng lỗi vào GitHub Issue và lưu link trong báo cáo.
- Lưu ghi chú usability theo mã P01 đến P07. Đặt recording và danh sách liên hệ xác minh trong `.local/` để tách khỏi Git.
- Chỉ ghi ảnh và kết quả đã thu được trong buổi chạy thật. Đối chiếu email sinh viên trên ảnh và điều kiện nhận diện của đề trước khi đóng gói.
