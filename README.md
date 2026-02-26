# ADA-ATTRITION — Hệ thống Phân tích & Dự đoán Nghỉ việc Nhân sự IBM

> **Môn học:** Applied Data Analytics  
> **Nhóm:** Nhóm 11 — Nhom11loveThayCuong  
> **Dataset:** IBM HR Employee Attrition  

## Giới thiệu

Dự án phân tích dữ liệu nhân sự IBM (1,470 nhân viên) nhằm tìm hiểu các yếu tố ảnh hưởng đến tỷ lệ nghỉ việc (Attrition) và xây dựng mô hình dự đoán. Dự án bao gồm:

- **Exploratory Data Analysis (EDA)** — Khám phá & trực quan hóa dữ liệu
- **Diagnostic Analysis** — Phân tích chẩn đoán nguyên nhân nghỉ việc
- **Predictive Modeling** — Xây dựng mô hình Machine Learning dự đoán nghỉ việc
- **Web Dashboard** — Giao diện web tương tác hiển thị kết quả phân tích

## Cấu trúc Project

```
ADA-ATTRITION/
├── index.html                                    # Trang web dashboard chính
├── style.css                                     # Giao diện CSS
├── script.js                                     # Logic tương tác & biểu đồ
├── package.json                                  # Cấu hình project & scripts
├── Data/
│   └── WA_Fn-UseC_-HR-Employee-Attrition.csv     # Dataset IBM HR (1,470 records)
├── EDA/
│   └── FP_Code_EDA.ipynb                         # Notebook phân tích EDA
├── Diagnostic/
│   └── FP_Code_Diagnostic Analysis.ipynb         # Notebook phân tích chẩn đoán
└── Model/
    └── Predictive_Analysis__Final.ipynb           # Notebook xây dựng mô hình dự đoán
```

## Tính năng Web Dashboard

Giao diện web với sidebar điều hướng gồm 5 mục chính:

| Mục | Mô tả |
|-----|--------|
| 🗄️ **Dữ liệu** | Hiển thị bảng dữ liệu nhân sự gốc |
| 📋 **Tổng quan** | Dashboard tổng quan: tổng nhân viên, tỷ lệ nghỉ việc, thu nhập TB, thâm niên TB |
| 📊 **Phân tích theo nhóm** | Biểu đồ phân tích nghỉ việc theo phòng ban, độ tuổi, làm thêm giờ, thu nhập |
| 🧠 **Model Training** | Kết quả huấn luyện mô hình ML (accuracy, confusion matrix, feature importance) |
| 📈 **Prediction** | Dự đoán khả năng nghỉ việc của nhân viên |

## Cách chạy

### Web Dashboard

```bash
# Cài dependencies
npm install

# Chạy local server
npm run dev
```

Hoặc mở trực tiếp `index.html` trong trình duyệt.

### Jupyter Notebooks

```bash
# Mở notebook EDA
jupyter notebook EDA/FP_Code_EDA.ipynb

# Mở notebook Diagnostic
jupyter notebook "Diagnostic/FP_Code_Diagnostic Analysis.ipynb"

# Mở notebook Predictive Model
jupyter notebook Model/Predictive_Analysis__Final.ipynb
```

## Công nghệ sử dụng

### Web Dashboard
- HTML5, CSS3 (Flexbox & Grid)
- JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/) — Biểu đồ tương tác
- [Font Awesome](https://fontawesome.com/) — Icon

### Data Analysis & Modeling
- Python
- Jupyter Notebook
- Pandas, NumPy, Matplotlib, Seaborn
- Scikit-learn (Machine Learning)

## Dataset

**IBM HR Employee Attrition** — Bộ dữ liệu gồm 1,470 nhân viên với 35 thuộc tính bao gồm:
- Thông tin cá nhân (tuổi, giới tính, tình trạng hôn nhân, ...)
- Thông tin công việc (phòng ban, vị trí, mức lương, làm thêm giờ, ...)
- Mức độ hài lòng (môi trường, công việc, quan hệ, ...)
- Biến mục tiêu: **Attrition** (Yes/No)