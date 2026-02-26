# Trang Web Quản lý Kiosk

Đây là một trang web đơn giản với layout tương tự như app quản lý kiosk, bao gồm sidebar bên trái với các chức năng chính và khu vực nội dung ở giữa.

## Cấu trúc Project

```
NhanSu/
├── index.html      # File HTML chính
├── style.css       # File CSS cho styling
├── script.js       # File JavaScript cho tương tác
└── README.md       # File hướng dẫn này
```

## Tính năng

- **Sidebar bên trái** với 5 chức năng chính:
  - 🗄️ Dữ liệu
  - 📋 Tổng quan  
  - 📊 Phân tích theo nhóm
  - 🧠 Model Training
  - 📈 Prediction

- **Header** với tên trang và thông tin người dùng
- **Khu vực nội dung chính** (hiện tại để trống với placeholder)
- **Responsive design** - tự động thích ứng với màn hình di động
- **Tương tác JavaScript** - click menu để thay đổi nội dung placeholder

## Cách sử dụng

1. Mở file `index.html` trong trình duyệt web
2. Click vào các menu items ở sidebar để thấy placeholder thay đổi
3. Trang web sẽ tự động thích ứng với kích thước màn hình

## Tùy chỉnh

### Thêm nội dung vào khu vực chính:
- Chỉnh sửa phần `.main-content` trong file `index.html`
- Thay thế `.content-placeholder` bằng nội dung thực tế

### Thay đổi màu sắc:
- Chỉnh sửa các biến CSS trong file `style.css`
- Header: `background: linear-gradient(135deg, #e74c3c, #c0392b)`
- Sidebar: `background: linear-gradient(180deg, #2c3e50, #34495e)`

### Thêm menu items:
- Thêm HTML cho menu mới trong `.nav-menu`
- Cập nhật JavaScript trong `script.js` để xử lý menu mới

## Công nghệ sử dụng

- HTML5
- CSS3 (với Flexbox và Grid)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts

## Tương thích trình duyệt

- Chrome/Edge: ✅
- Firefox: ✅  
- Safari: ✅
- Internet Explorer: ❌ (cần ES6+ support)