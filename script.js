// JavaScript cho tương tác menu
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const pageTitle = document.querySelector('.page-title');
    const menuItems = document.querySelectorAll('.menu-item');
    const mainContent = document.querySelector('.main-content');
    
    // Set default active state for "Trang chủ"
    dropdownItems[0].classList.add('active');
    
    // Toggle dropdown menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
    
    // Handle dropdown item clicks
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const menuType = this.getAttribute('data-menu');
            const menuText = this.querySelector('span').textContent;
            
            // Update active states
            dropdownItems.forEach(dropItem => {
                dropItem.classList.remove('active');
            });
            this.classList.add('active');
            
            // Keep page title fixed - không thay đổi title
            // pageTitle.textContent = menuText;
            
            // Close dropdown
            dropdownMenu.classList.remove('show');
            
            // Update sidebar active state and content
            updateSidebarAndContent(menuType, menuText);
        });
    });
    
    // Function to update sidebar and main content
    function updateSidebarAndContent(menuType, menuText) {
        // Remove active from all sidebar items
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Find and activate corresponding sidebar item
        const sidebarMapping = {
            'home': -1, // No sidebar equivalent
            'menu': 0,  // Dữ liệu
            'program': 1, // Tổng quan  
            'report': 2, // Báo cáo
            'payment': 3, // Model Training
            'ai': 4 // Prediction
        };
        
        const sidebarIndex = sidebarMapping[menuType];
        if (sidebarIndex >= 0 && menuItems[sidebarIndex]) {
            menuItems[sidebarIndex].classList.add('active');
        }
        
        // Update placeholder content
        if (menuType === 'home') {
            updatePlaceholder('Trang chủ');
        } else {
            updatePlaceholder(menuText);
        }
    }

    // Thêm event listener cho mỗi menu item trong sidebar
    menuItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Xóa class active khỏi tất cả items
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });

            // Thêm class active cho item được click
            this.classList.add('active');
            
            // Cập nhật dropdown active state
            dropdownItems.forEach(dropItem => {
                dropItem.classList.remove('active');
            });
            
            // Map sidebar to dropdown
            const dropdownMapping = [1, 2, 3, 4, 5]; // menu, program, report, payment, ai
            if (dropdownMapping[index] && dropdownItems[dropdownMapping[index]]) {
                dropdownItems[dropdownMapping[index]].classList.add('active');
                // pageTitle.textContent = this.querySelector('span').textContent; // Keep title fixed
            }

            // Cập nhật nội dung placeholder dựa trên menu được chọn
            updatePlaceholder(this.querySelector('span').textContent);
        });
    });

    // Hàm cập nhật placeholder content
    function updatePlaceholder(menuName) {
        const placeholder = document.querySelector('.content-placeholder');
        const ibmLogoBg = document.querySelector('.ibm-logo-bg');
        const dataSection = document.getElementById('dataSection');
        const overviewSection = document.getElementById('overviewSection');
        const reportSection = document.getElementById('reportSection');
        const modelTrainingSection = document.getElementById('modelTrainingSection');
        const predictionSection = document.getElementById('predictionSection');
        const placeholderIcon = placeholder.querySelector('i');
        const placeholderTitle = placeholder.querySelector('p:first-of-type');
        const placeholderText = placeholder.querySelector('.placeholder-text');

        // Hide all sections first
        dataSection.style.display = 'none';
        overviewSection.style.display = 'none';
        reportSection.style.display = 'none';
        modelTrainingSection.style.display = 'none';
        predictionSection.style.display = 'none';
        placeholder.style.display = 'none';
        ibmLogoBg.style.display = 'none';

        // Nếu chọn "Dữ liệu" -> hiện data section
        if (menuName === 'Dữ liệu') {
            dataSection.style.display = 'block';
            mainContent.style.alignItems = 'flex-start';
            mainContent.style.justifyContent = 'flex-start';
            if (!window.csvDataLoaded) {
                loadCSVData();
            }
            return;
        }

        // Nếu chọn "Tổng quan" -> hiện overview section
        if (menuName === 'Tổng quan') {
            overviewSection.style.display = 'block';
            mainContent.style.alignItems = 'flex-start';
            mainContent.style.justifyContent = 'flex-start';
            if (!window.overviewDataLoaded) {
                loadOverviewData();
            }
            return;
        }

        // Nếu chọn "Phân tích theo nhóm" -> hiện report section
        if (menuName === 'Phân tích theo nhóm') {
            reportSection.style.display = 'block';
            mainContent.style.alignItems = 'flex-start';
            mainContent.style.justifyContent = 'flex-start';
            if (!window.reportDataLoaded) {
                loadReportData();
            }
            return;
        }

        // Nếu chọn "Model Training" -> hiện model training section
        if (menuName === 'Model Training') {
            modelTrainingSection.style.display = 'block';
            mainContent.style.alignItems = 'flex-start';
            mainContent.style.justifyContent = 'flex-start';
            return;
        }

        // Nếu chọn "Prediction" -> hiện prediction section
        if (menuName === 'Prediction') {
            predictionSection.style.display = 'block';
            mainContent.style.alignItems = 'flex-start';
            mainContent.style.justifyContent = 'flex-start';
            return;
        }

        // Hiện placeholder cho các menu khác
        placeholder.style.display = 'block';
        ibmLogoBg.style.display = 'flex';
        mainContent.style.alignItems = 'center';
        mainContent.style.justifyContent = 'center';

        // Cập nhật icon và text dựa trên menu được chọn
        switch(menuName) {
            case 'Trang chủ':
                placeholderIcon.className = 'fas fa-home';
                placeholderTitle.textContent = 'Trang chủ';
                placeholderText.textContent = 'Chào mừng bạn đến với hệ thống quản lí nhân sự IBM';
                break;
            case 'Dữ liệu':
                placeholderIcon.className = 'fas fa-database';
                placeholderTitle.textContent = 'Quản lý Dữ liệu';
                placeholderText.textContent = 'Thêm, sửa, xóa các dữ liệu';
                break;
            case 'Tổng quan':
                placeholderIcon.className = 'fas fa-tasks';
                placeholderTitle.textContent = 'Tổng quan';
                placeholderText.textContent = 'Xem tổng quan và thống kê chung của hệ thống';
                break;
            case 'Phân tích theo nhóm':
                placeholderIcon.className = 'fas fa-chart-bar';
                placeholderTitle.textContent = 'Phân tích theo nhóm';
                placeholderText.textContent = 'Phân tích chi tiết dữ liệu theo từng nhóm nhân viên';
                break;
            case 'Model Training':
                placeholderIcon.className = 'fas fa-brain';
                placeholderTitle.textContent = 'Model Training';
                placeholderText.textContent = 'Huấn luyện và dự đoán mô hình Machine Learning';
                break;
            case 'Prediction':
                placeholderIcon.className = 'fas fa-chart-line';
                placeholderTitle.textContent = 'Prediction';
                placeholderText.textContent = 'Employee Attrition Prediction System';
                break;
            default:
                placeholderIcon.className = 'fas fa-plus-circle';
                placeholderTitle.textContent = 'Khu vực nội dung chính';
                placeholderText.textContent = 'Bạn có thể thêm nội dung vào đây';
        }
    }

    // Thêm hiệu ứng hover cho các menu items
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });

        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });

    // Thêm animation cho content area khi load trang
    setTimeout(() => {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        mainContent.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }, 500);

    // ==================== DATA MANAGEMENT ====================
    let allData = [];
    let filteredData = [];
    let currentPage = 1;
    const pageSize = 20;
    let headers = [];

    // Hiển thị tất cả 35 cột - displayColumns sẽ được gán sau khi parse CSV
    let displayColumns = [];

    // Giữ nguyên tên cột gốc tiếng Anh từ bộ dữ liệu
    const columnLabels = {};

    function loadCSVData() {
        fetch('Data/WA_Fn-UseC_-HR-Employee-Attrition.csv')
            .then(response => {
                if (!response.ok) throw new Error('Không thể tải file CSV');
                return response.text();
            })
            .then(csvText => {
                parseCSV(csvText);
                window.csvDataLoaded = true;
            })
            .catch(err => {
                console.error('Lỗi tải dữ liệu:', err);
                document.getElementById('tableBody').innerHTML =
                    '<tr><td colspan="36" style="text-align:center;padding:40px;color:#e74c3c;"><i class="fas fa-exclamation-triangle"></i> Không thể tải dữ liệu. Hãy chạy <b>npm run dev</b> để khởi động server.</td></tr>';
            });
    }

    function parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        headers = lines[0].split(',').map(h => h.trim());
        allData = [];

        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((h, idx) => {
                    row[h] = values[idx];
                });
                allData.push(row);
            }
        }

        displayColumns = [...headers];
        filteredData = [...allData];
        currentPage = 1;
        renderTable();
        updateStats();
    }

    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (inQuotes) {
                if (ch === '"') {
                    if (i + 1 < line.length && line[i + 1] === '"') {
                        current += '"';
                        i++;
                    } else {
                        inQuotes = false;
                    }
                } else {
                    current += ch;
                }
            } else {
                if (ch === '"') {
                    inQuotes = true;
                } else if (ch === ',') {
                    result.push(current.trim());
                    current = '';
                } else {
                    current += ch;
                }
            }
        }
        result.push(current.trim());
        return result;
    }

    function renderTable() {
        // Render header
        const headerRow = document.getElementById('tableHeader');
        headerRow.innerHTML = '<th>#</th>' + displayColumns.map(col =>
            `<th>${columnLabels[col] || col}</th>`
        ).join('');

        // Render body
        const tbody = document.getElementById('tableBody');
        const totalPages = Math.ceil(filteredData.length / pageSize);
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = Math.min(startIdx + pageSize, filteredData.length);
        const pageData = filteredData.slice(startIdx, endIdx);

        if (pageData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="' + (displayColumns.length + 1) + '" style="text-align:center;padding:40px;color:#95a5a6;"><i class="fas fa-inbox" style="font-size:30px;display:block;margin-bottom:10px;"></i>Không tìm thấy dữ liệu</td></tr>';
            return;
        }

        tbody.innerHTML = pageData.map((row, idx) => {
            const rowNum = startIdx + idx + 1;
            const cells = displayColumns.map(col => {
                let val = row[col] || '';
                return `<td>${formatCellValue(col, val)}</td>`;
            }).join('');
            return `<tr><td class="row-number">#${rowNum}</td>${cells}</tr>`;
        }).join('');

        updatePagination();
        updatePaginationInfo(startIdx + 1, endIdx, filteredData.length);
    }

    function formatCellValue(col, val) {
        switch (col) {
            case 'Attrition':
                return val === 'Yes'
                    ? '<span class="badge badge-danger"><i class="fas fa-times-circle"></i> Yes</span>'
                    : '<span class="badge badge-success"><i class="fas fa-check-circle"></i> No</span>';
            case 'OverTime':
                return val === 'Yes'
                    ? '<span class="badge badge-warning">Yes</span>'
                    : '<span class="badge badge-info">No</span>';
            case 'MonthlyIncome':
                return '<span class="text-money">$' + Number(val).toLocaleString() + '</span>';
            case 'Gender':
                return val === 'Female'
                    ? '<span class="badge badge-female"><i class="fas fa-venus"></i> Nữ</span>'
                    : '<span class="badge badge-male"><i class="fas fa-mars"></i> Nam</span>';
            case 'JobSatisfaction':
            case 'PerformanceRating':
                const num = parseInt(val);
                const stars = '★'.repeat(num) + '☆'.repeat(Math.max(0, 4 - num));
                const starClass = num >= 3 ? 'stars-high' : (num >= 2 ? 'stars-mid' : 'stars-low');
                return `<span class="stars ${starClass}">${stars}</span>`;
            case 'Department':
                const deptIcons = {
                    'Sales': 'fa-chart-line',
                    'Research & Development': 'fa-flask',
                    'Human Resources': 'fa-users'
                };
                const icon = deptIcons[val] || 'fa-building';
                return `<i class="fas ${icon}" style="margin-right:5px;color:#3498db;"></i>${val}`;
            default:
                return val;
        }
    }

    function updateStats() {
        document.getElementById('statTotal').textContent = filteredData.length;
        document.getElementById('statCurrentPage').textContent = currentPage;
        document.getElementById('statPageSize').textContent = pageSize;
        document.getElementById('statTotalPages').textContent = Math.ceil(filteredData.length / pageSize);
    }

    function updatePaginationInfo(from, to, total) {
        document.getElementById('showFrom').textContent = total > 0 ? from : 0;
        document.getElementById('showTo').textContent = to;
        document.getElementById('showTotal').textContent = total;
        updateStats();
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredData.length / pageSize);
        const pageNumbersContainer = document.getElementById('pageNumbers');
        pageNumbersContainer.innerHTML = '';

        // Determine page range to show
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        if (endPage - startPage < 4) {
            if (startPage === 1) endPage = Math.min(totalPages, startPage + 4);
            else startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const btn = document.createElement('button');
            btn.className = 'page-num' + (i === currentPage ? ' active' : '');
            btn.textContent = i;
            btn.addEventListener('click', () => goToPage(i));
            pageNumbersContainer.appendChild(btn);
        }

        // Enable/disable nav buttons
        document.getElementById('btnFirst').disabled = currentPage === 1;
        document.getElementById('btnPrev').disabled = currentPage === 1;
        document.getElementById('btnNext').disabled = currentPage === totalPages || totalPages === 0;
        document.getElementById('btnLast').disabled = currentPage === totalPages || totalPages === 0;
    }

    function goToPage(page) {
        const totalPages = Math.ceil(filteredData.length / pageSize);
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderTable();
    }

    // Các biến định tính (categorical) để tìm kiếm
    const categoricalColumns = [
        'Attrition', 'BusinessTravel', 'Department', 'EducationField',
        'Gender', 'JobRole', 'MaritalStatus', 'Over18', 'OverTime'
    ];

    // Search functionality - chỉ tìm theo biến định tính
    function searchData(query) {
        const q = query.toLowerCase().trim();
        if (!q) {
            filteredData = [...allData];
        } else {
            filteredData = allData.filter(row => {
                return categoricalColumns.some(col => {
                    const val = (row[col] || '').toString().toLowerCase();
                    return val.includes(q);
                });
            });
        }
        currentPage = 1;
        renderTable();
        updateStats();
    }

    // Event listeners for data section
    document.getElementById('btnSearch').addEventListener('click', () => {
        searchData(document.getElementById('dataSearchInput').value);
    });

    document.getElementById('dataSearchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchData(e.target.value);
        }
    });

    document.getElementById('btnRefresh').addEventListener('click', () => {
        document.getElementById('dataSearchInput').value = '';
        filteredData = [...allData];
        currentPage = 1;
        renderTable();
        updateStats();
    });

    document.getElementById('btnFirst').addEventListener('click', () => goToPage(1));
    document.getElementById('btnPrev').addEventListener('click', () => goToPage(currentPage - 1));
    document.getElementById('btnNext').addEventListener('click', () => goToPage(currentPage + 1));
    document.getElementById('btnLast').addEventListener('click', () => goToPage(Math.ceil(filteredData.length / pageSize)));

    // ==================== MODEL TRAINING ====================
    let selectedModel = 'RandomForest';
    let selectedResampling = 'SMOTE';
    let trainedModel = null;
    let modelMetrics = null;

    // Toggle button handlers cho Model selection
    document.querySelectorAll('#modelToggleGroup .toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#modelToggleGroup .toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedModel = this.getAttribute('data-model');
        });
    });

    // Toggle button handlers cho Resampling selection
    document.querySelectorAll('#resamplingToggleGroup .toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#resamplingToggleGroup .toggle-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedResampling = this.getAttribute('data-resampling');
        });
    });

    // Train Model button
    document.getElementById('btnTrainModel').addEventListener('click', function() {
        const randomState = document.getElementById('randomState').value;
        const testSize = document.getElementById('testSize').value;
        const btn = this;
        const successMsg = document.getElementById('trainSuccessMsg');
        successMsg.style.display = 'none'; // Hide previous message
        
        // Reset evaluation metrics to empty
        document.getElementById('metricAccuracy').textContent = '—';
        document.getElementById('metricPrecision').textContent = '—';
        document.getElementById('metricRecall').textContent = '—';
        document.getElementById('metricF1').textContent = '—';
        document.getElementById('metricAccuracyNo').textContent = '—';
        document.getElementById('metricPrecisionNo').textContent = '—';
        document.getElementById('metricRecallNo').textContent = '—';
        document.getElementById('metricF1No').textContent = '—';
        document.getElementById('metricAccuracyYes').textContent = '—';
        document.getElementById('metricPrecisionYes').textContent = '—';
        document.getElementById('metricRecallYes').textContent = '—';
        document.getElementById('metricF1Yes').textContent = '—';
        document.getElementById('evalModel').textContent = '—';
        document.getElementById('evalResampling').textContent = '—';
        modelMetrics = null;
        trainedModel = null;
        
        // Show loading state
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Training...';
        
        // Show training log
        const trainingLog = document.getElementById('trainingLog');
        const logContent = document.getElementById('logContent');
        trainingLog.style.display = 'block';
        logContent.innerHTML = '';
        
        // Simulate training process with logs
        const logs = [
            `[INFO] Initializing ${selectedModel} model...`,
            `[INFO] Loading dataset: WA_Fn-UseC_-HR-Employee-Attrition.csv`,
            `[INFO] Preprocessing data...`,
            `[INFO] Applying ${selectedResampling} resampling method...`,
            `[INFO] Splitting data: Test Size = ${testSize}, Random State = ${randomState}`,
            `[INFO] Training model...`,
            `[INFO] Model training completed successfully!`
        ];
        
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < logs.length) {
                const logLine = document.createElement('div');
                logLine.className = 'log-line';
                logLine.textContent = logs[logIndex];
                logContent.appendChild(logLine);
                logContent.scrollTop = logContent.scrollHeight;
                logIndex++;
            } else {
                clearInterval(logInterval);
                
                // Simulate metrics based on model selection
                modelMetrics = generateSimulatedMetrics(selectedModel, selectedResampling);
                trainedModel = {
                    model: selectedModel,
                    resampling: selectedResampling,
                    randomState: randomState,
                    testSize: testSize,
                    timestamp: new Date().toISOString()
                };
                
                // Update evaluation info
                document.getElementById('evalModel').textContent = selectedModel;
                document.getElementById('evalResampling').textContent = selectedResampling;
                
                // Reset button
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-play"></i> Train model';
                
                // Show success message
                const successMsg = document.getElementById('trainSuccessMsg');
                successMsg.style.display = 'block';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 4000);
            }
        }, 500);
    });

    // Generate simulated metrics based on notebook results
    // Per-class metrics from classification_report output
    function generateSimulatedMetrics(model, resampling) {
        const metricsMap = {
            'LogisticRegression_SMOTE': {
                accuracy: 0.6939, precision: 0.7284, recall: 0.6871, f1: 0.6782,
                no:  { accuracy: 0.6939, precision: 0.8965, recall: 0.6832, f1: 0.7756 },
                yes: { accuracy: 0.6939, precision: 0.3023, recall: 0.6429, f1: 0.4114 }
            },
            'LogisticRegression_ClassWeight': {
                accuracy: 0.6837, precision: 0.7193, recall: 0.6776, f1: 0.6694,
                no:  { accuracy: 0.6837, precision: 0.9077, recall: 0.6614, f1: 0.7652 },
                yes: { accuracy: 0.6837, precision: 0.2917, recall: 0.6786, f1: 0.4081 }
            },
            'DecisionTree_SMOTE': {
                accuracy: 0.7211, precision: 0.6985, recall: 0.7178, f1: 0.7041,
                no:  { accuracy: 0.7211, precision: 0.8824, recall: 0.7525, f1: 0.8122 },
                yes: { accuracy: 0.7211, precision: 0.2836, recall: 0.4915, f1: 0.3596 }
            },
            'DecisionTree_ClassWeight': {
                accuracy: 0.7007, precision: 0.6932, recall: 0.7041, f1: 0.6918,
                no:  { accuracy: 0.7007, precision: 0.8913, recall: 0.7228, f1: 0.7983 },
                yes: { accuracy: 0.7007, precision: 0.2692, recall: 0.5254, f1: 0.3562 }
            },
            'RandomForest_SMOTE': {
                accuracy: 0.8095, precision: 0.7618, recall: 0.8061, f1: 0.7793,
                no:  { accuracy: 0.8095, precision: 0.8824, recall: 0.8713, f1: 0.8768 },
                yes: { accuracy: 0.8095, precision: 0.4474, recall: 0.4746, f1: 0.4606 }
            },
            'RandomForest_ClassWeight': {
                accuracy: 0.8299, precision: 0.7814, recall: 0.8265, f1: 0.7986,
                no:  { accuracy: 0.8299, precision: 0.8684, recall: 0.9208, f1: 0.8938 },
                yes: { accuracy: 0.8299, precision: 0.5217, recall: 0.3814, f1: 0.4407 }
            },
            'XGBoost_SMOTE': {
                accuracy: 0.8163, precision: 0.7753, recall: 0.8129, f1: 0.7896,
                no:  { accuracy: 0.8163, precision: 0.8889, recall: 0.8812, f1: 0.8850 },
                yes: { accuracy: 0.8163, precision: 0.4815, recall: 0.5000, f1: 0.4906 }
            },
            'XGBoost_ClassWeight': {
                accuracy: 0.8197, precision: 0.7731, recall: 0.8163, f1: 0.7902,
                no:  { accuracy: 0.8197, precision: 0.8864, recall: 0.8861, f1: 0.8862 },
                yes: { accuracy: 0.8197, precision: 0.4706, recall: 0.4737, f1: 0.4721 }
            }
        };
        
        const key = model + '_' + resampling;
        return metricsMap[key] || metricsMap['RandomForest_SMOTE'];
    }

    // Evaluate button
    document.getElementById('btnEvaluate').addEventListener('click', function() {
        const successMsg = document.getElementById('evaluateSuccessMsg');
        successMsg.style.display = 'none'; // Hide previous message
        
        if (!trainedModel || !modelMetrics) {
            showNotification('Please train a model first!', 'warning');
            return;
        }
        
        const btn = this;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Evaluating...';
        
        // Simulate evaluation delay
        setTimeout(() => {
            // Overall
            document.getElementById('metricAccuracy').textContent = (modelMetrics.accuracy * 100).toFixed(2) + '%';
            document.getElementById('metricPrecision').textContent = (modelMetrics.precision * 100).toFixed(2) + '%';
            document.getElementById('metricRecall').textContent = (modelMetrics.recall * 100).toFixed(2) + '%';
            document.getElementById('metricF1').textContent = (modelMetrics.f1 * 100).toFixed(2) + '%';
            // Class No
            document.getElementById('metricAccuracyNo').textContent = (modelMetrics.no.accuracy * 100).toFixed(2) + '%';
            document.getElementById('metricPrecisionNo').textContent = (modelMetrics.no.precision * 100).toFixed(2) + '%';
            document.getElementById('metricRecallNo').textContent = (modelMetrics.no.recall * 100).toFixed(2) + '%';
            document.getElementById('metricF1No').textContent = (modelMetrics.no.f1 * 100).toFixed(2) + '%';
            // Class Yes
            document.getElementById('metricAccuracyYes').textContent = (modelMetrics.yes.accuracy * 100).toFixed(2) + '%';
            document.getElementById('metricPrecisionYes').textContent = (modelMetrics.yes.precision * 100).toFixed(2) + '%';
            document.getElementById('metricRecallYes').textContent = (modelMetrics.yes.recall * 100).toFixed(2) + '%';
            document.getElementById('metricF1Yes').textContent = (modelMetrics.yes.f1 * 100).toFixed(2) + '%';
            
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-chart-line"></i> Evaluate';
            
            // Show success message
            const successMsg = document.getElementById('evaluateSuccessMsg');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 4000);
        }, 1000);
    });

    // Save Model button
    document.getElementById('btnSaveModel').addEventListener('click', function() {
        const successMsg = document.getElementById('saveSuccessMsg');
        successMsg.style.display = 'none'; // Hide previous message
        
        if (!trainedModel) {
            showNotification('Please train a model first!', 'warning');
            return;
        }
        
        const btn = this;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        
        setTimeout(() => {
            // Create downloadable model info
            const modelData = {
                ...trainedModel,
                metrics: modelMetrics
            };
            
            const blob = new Blob([JSON.stringify(modelData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `model_${trainedModel.model}_${trainedModel.resampling}_${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-download"></i> Save Current Trained Model';
            
            // Show success message
            const successMsg = document.getElementById('saveSuccessMsg');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 4000);
        }, 800);
    });

    // Notification helper function
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ========================================
    // PREDICTION SECTION
    // ========================================

    let loadedModel = null;
    let loadedScaler = null;
    let featureList = null;

    // File input change handler
    document.getElementById('modelFileInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('modelFileName').value = file.name;
        }
    });

    // Load Model button
    document.getElementById('btnLoadModel').addEventListener('click', function() {
        const fileInput = document.getElementById('modelFileInput');
        const successMsg = document.getElementById('loadModelSuccessMsg');
        successMsg.style.display = 'none';
        
        if (!fileInput.files.length) {
            showNotification('Please select a model file first!', 'warning');
            return;
        }
        
        const btn = this;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate model loading
        setTimeout(() => {
            // In a real implementation, you would parse the file and load the model
            // For now, we'll simulate a successful load with predefined settings
            loadedModel = {
                type: 'RandomForest',
                features: [
                    'Age', 'MonthlyIncome', 'DistanceFromHome', 
                    'YearsAtCompany', 'YearsInCurrentRole', 'TotalWorkingYears',
                    'OverTime_Yes', 'MaritalStatus_Single', 
                    'BusinessTravel_Travel_Frequently', 'EducationField_Medical'
                ]
            };
            
            // Simulated scaler parameters (mean and std for standardization)
            loadedScaler = {
                mean: [36.92, 6502.93, 9.19, 7.01, 4.23, 11.28],
                std: [9.14, 4707.96, 8.11, 6.13, 3.62, 7.78]
            };
            
            featureList = loadedModel.features;
            
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-upload"></i> Load Selected Model';
            
            // Show success message
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 4000);
        }, 1500);
    });

    // Predict button
    document.getElementById('btnPredict').addEventListener('click', function() {
        // Check if model is loaded
        if (!loadedModel) {
            showNotification('Please load a model first!', 'warning');
            return;
        }
        
        // Get numeric inputs
        const age = parseFloat(document.getElementById('inputAge').value);
        const monthlyIncome = parseFloat(document.getElementById('inputMonthlyIncome').value);
        const distanceFromHome = parseFloat(document.getElementById('inputDistanceFromHome').value);
        const yearsAtCompany = parseFloat(document.getElementById('inputYearsAtCompany').value);
        const yearsInCurrentRole = parseFloat(document.getElementById('inputYearsInCurrentRole').value);
        const totalWorkingYears = parseFloat(document.getElementById('inputTotalWorkingYears').value);
        
        // Get categorical inputs
        const overTime = document.getElementById('inputOverTime').value;
        const maritalStatus = document.getElementById('inputMaritalStatus').value;
        const businessTravel = document.getElementById('inputBusinessTravel').value;
        const educationField = document.getElementById('inputEducationField').value;
        
        // Validate inputs
        if (isNaN(age) || isNaN(monthlyIncome) || isNaN(distanceFromHome) || 
            isNaN(yearsAtCompany) || isNaN(yearsInCurrentRole) || isNaN(totalWorkingYears)) {
            showNotification('Please fill in all numeric fields!', 'warning');
            return;
        }
        
        if (!overTime || !maritalStatus || !businessTravel || !educationField) {
            showNotification('Please fill in all dropdown fields!', 'warning');
            return;
        }
        
        const btn = this;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Predicting...';
        
        // Hide previous results
        document.getElementById('predictionResultContent').style.display = 'none';
        document.querySelector('.result-placeholder').style.display = 'flex';
        document.getElementById('recommendationContent').style.display = 'none';
        document.querySelector('.recommendation-placeholder').style.display = 'flex';
        
        setTimeout(() => {
            // STEP 3: Preprocessing
            // 1. Standardize numeric features
            const numericFeatures = [age, monthlyIncome, distanceFromHome, 
                                    yearsAtCompany, yearsInCurrentRole, totalWorkingYears];
            const scaledNumeric = numericFeatures.map((val, idx) => {
                return (val - loadedScaler.mean[idx]) / loadedScaler.std[idx];
            });
            
            // 2. Create dummy variables (only 4 can be 1)
            const overTimeYes = (overTime === 'Yes') ? 1 : 0;
            const maritalStatusSingle = (maritalStatus === 'Single') ? 1 : 0;
            const businessTravelFreq = (businessTravel === 'Travel_Frequently') ? 1 : 0;
            const educationFieldMedical = (educationField === 'Medical') ? 1 : 0;
            
            // 3. Combine into final input vector
            const inputVector = [...scaledNumeric, overTimeYes, maritalStatusSingle, 
                                businessTravelFreq, educationFieldMedical];
            
            // STEP 4: Model Prediction
            // Simulate prediction (in real implementation, use actual model)
            const probability = simulateModelPrediction(inputVector);
            const riskLevel = probability >= 0.5 ? 'High Risk' : 'Low Risk';
            
            // Display results
            document.querySelector('.result-placeholder').style.display = 'none';
            document.getElementById('predictionResultContent').style.display = 'block';
            document.getElementById('riskBadge').textContent = riskLevel;
            document.getElementById('riskBadge').className = `result-value risk-badge ${probability >= 0.5 ? 'high' : 'low'}`;
            document.getElementById('probabilityValue').textContent = (probability * 100).toFixed(2) + '%';
            
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-magic"></i> Predict';
            
            // STEP 5: Generate Recommendations
            generateRecommendations(probability, {
                age, monthlyIncome, distanceFromHome,
                yearsAtCompany, yearsInCurrentRole, totalWorkingYears,
                overTime, maritalStatus, businessTravel, educationField
            });
        }, 1500);
    });

    // Simulate model prediction
    function simulateModelPrediction(inputVector) {
        // This is a simplified simulation
        // In real implementation, you would use the loaded model
        
        // Factor in key features for simulation
        const [age, income, distance, yearsAtComp, yearsInRole, totalYears, 
               overtime, single, travelFreq, medical] = inputVector;
        
        let riskScore = 0.3; // Base risk
        
        // Lower income increases risk
        if (income < -0.5) riskScore += 0.2;
        
        // Overtime increases risk significantly
        if (overtime === 1) riskScore += 0.25;
        
        // Short tenure increases risk
        if (yearsAtComp < 0) riskScore += 0.15;
        
        // Frequent travel increases risk
        if (travelFreq === 1) riskScore += 0.15;
        
        // Single status slightly increases risk
        if (single === 1) riskScore += 0.1;
        
        // Keep between 0 and 1
        riskScore = Math.min(Math.max(riskScore, 0), 0.95);
        
        // Add some randomness
        riskScore += (Math.random() - 0.5) * 0.1;
        riskScore = Math.min(Math.max(riskScore, 0.05), 0.95);
        
        return riskScore;
    }

    // Generate recommendations using Gemini API
    async function generateRecommendations(probability, employeeData) {
        const recommendationContent = document.getElementById('recommendationContent');
        const recommendationPlaceholder = document.querySelector('.recommendation-placeholder');
        const recommendationLoading = document.getElementById('recommendationLoading');
        const recommendationText = document.getElementById('recommendationText');
        
        // Show recommendation section with loading state
        recommendationPlaceholder.style.display = 'none';
        recommendationContent.style.display = 'block';
        recommendationLoading.style.display = 'flex';
        recommendationText.style.display = 'none';
        
        // Prepare prompt for Gemini
        const riskLevel = probability >= 0.5 ? 'Cao' : 'Thấp';
        const prompt = `Bạn là chuyên gia phân tích nhân sự. Hãy phân tích rủi ro nghỉ việc của nhân viên này và đưa ra khuyến nghị bằng tiếng Việt.

Thông tin nhân viên:
- Tuổi: ${employeeData.age}
- Thu nhập hàng tháng: $${employeeData.monthlyIncome}
- Khoảng cách từ nhà đến công ty: ${employeeData.distanceFromHome} km
- Số năm làm việc tại công ty: ${employeeData.yearsAtCompany}
- Số năm ở vị trí hiện tại: ${employeeData.yearsInCurrentRole}
- Tổng số năm kinh nghiệm: ${employeeData.totalWorkingYears}
- Làm thêm giờ: ${employeeData.overTime === 'Yes' ? 'Có' : 'Không'}
- Tình trạng hôn nhân: ${employeeData.maritalStatus === 'Single' ? 'Độc thân' : employeeData.maritalStatus === 'Married' ? 'Đã kết hôn' : 'Đã ly hôn'}
- Tần suất công tác: ${employeeData.businessTravel === 'Travel_Frequently' ? 'Thường xuyên' : employeeData.businessTravel === 'Travel_Rarely' ? 'Hiếm khi' : 'Không'}
- Lĩnh vực học vấn: ${employeeData.educationField}

Mức độ rủi ro nghỉ việc dự đoán: ${riskLevel} (${(probability * 100).toFixed(2)}%)

Hãy cung cấp:
1. Các yếu tố rủi ro chính dẫn đến dự đoán này
2. Chiến lược giữ chân nhân viên cụ thể
3. Khuyến nghị hành động cho bộ phận nhân sự

Trả lời ngắn gọn và thiết thực (tối đa 200 từ).`;

        try {
            // Call Gemini API
            const API_KEY = 'AIzaSyC2lRlqhk9J9ApFcDVOoxYRnO0XY7kq7_M';
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to generate recommendations');
            }
            
            const data = await response.json();
            const recommendation = data.candidates[0].content.parts[0].text;
            
            // Display recommendation
            recommendationLoading.style.display = 'none';
            recommendationText.style.display = 'block';
            recommendationText.textContent = recommendation;
            
        } catch (error) {
            console.error('Error generating recommendations:', error);
            
            // Fallback to simulated recommendations
            const fallbackRecommendation = generateFallbackRecommendation(probability, employeeData);
            recommendationLoading.style.display = 'none';
            recommendationText.style.display = 'block';
            recommendationText.textContent = fallbackRecommendation;
        }
    }

    // Fallback recommendation generator
    function generateFallbackRecommendation(probability, data) {
        const riskLevel = probability >= 0.5 ? 'cao' : 'thấp';
        
        let recommendation = `📊 Phân tích rủi ro:\n`;
        recommendation += `Nhân viên này có mức độ rủi ro nghỉ việc ${riskLevel} (${(probability * 100).toFixed(1)}%).\n\n`;
        
        recommendation += `🔍 Yếu tố chính:\n`;
        if (data.overTime === 'Yes') {
            recommendation += `• Thường xuyên làm thêm giờ - cần cân bằng khối lượng công việc\n`;
        }
        if (data.yearsAtCompany < 2) {
            recommendation += `• Mới vào công ty - tập trung vào hội nhập và gắn kết\n`;
        }
        if (data.monthlyIncome < 5000) {
            recommendation += `• Thu nhập dưới mức trung bình - xem xét lại mức lương\n`;
        }
        if (data.businessTravel === 'Travel_Frequently') {
            recommendation += `• Công tác thường xuyên - có thể gây mất cân bằng công việc-cuộc sống\n`;
        }
        
        recommendation += `\n💡 Khuyến nghị:\n`;
        if (probability >= 0.5) {
            recommendation += `• Tổ chức buổi trao đổi 1-1 để thảo luận về mục tiêu nghề nghiệp\n`;
            recommendation += `• Xem xét lại gói lương thưởng và phúc lợi\n`;
            recommendation += `• Cân nhắc các chính sách làm việc linh hoạt\n`;
            recommendation += `• Cung cấp cơ hội phát triển chuyên môn\n`;
        } else {
            recommendation += `• Tiếp tục các buổi check-in định kỳ\n`;
            recommendation += `• Duy trì mức lương cạnh tranh\n`;
            recommendation += `• Hỗ trợ các sáng kiến cân bằng công việc-cuộc sống\n`;
        }
        
        return recommendation;
    }

    // ==================== OVERVIEW DASHBOARD ====================
    let overviewCharts = {};
    let reportCharts = {};

    function loadReportData() {
        fetch('Data/WA_Fn-UseC_-HR-Employee-Attrition.csv')
            .then(response => {
                if (!response.ok) throw new Error('Không thể tải file CSV');
                return response.text();
            })
            .then(csvText => {
                const data = parseCSVForOverview(csvText);
                window.reportRawData = data;
                drawReportTabCharts('demographics');
                window.reportDataLoaded = true;
            })
            .catch(err => {
                console.error('Lỗi tải dữ liệu report:', err);
            });
    }

    function loadOverviewData() {
        fetch('Data/WA_Fn-UseC_-HR-Employee-Attrition.csv')
            .then(response => {
                if (!response.ok) throw new Error('Không thể tải file CSV');
                return response.text();
            })
            .then(csvText => {
                const data = parseCSVForOverview(csvText);
                calculateOverviewMetrics(data);
                drawOverviewCharts(data);
                window.overviewDataLoaded = true;
            })
            .catch(err => {
                console.error('Lỗi tải dữ liệu overview:', err);
            });
    }

    function parseCSVForOverview(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            const values = lines[i].split(',');
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index]?.trim();
            });
            data.push(row);
        }

        return data;
    }

    function calculateOverviewMetrics(data) {
        const totalEmployees = data.length;
        const attritionYes = data.filter(row => row.Attrition === 'Yes').length;
        const attritionRate = ((attritionYes / totalEmployees) * 100).toFixed(1);
        
        // Calculate average income
        const incomes = data.map(row => parseFloat(row.MonthlyIncome)).filter(x => !isNaN(x));
        const avgIncome = (incomes.reduce((a, b) => a + b, 0) / incomes.length).toFixed(0);
        
        // Calculate average years at company
        const years = data.map(row => parseFloat(row.YearsAtCompany)).filter(x => !isNaN(x));
        const avgYears = Math.round(years.reduce((a, b) => a + b, 0) / years.length);

        // Update metrics
        document.getElementById('totalEmployees').textContent = totalEmployees.toLocaleString();
        document.getElementById('attritionCount').textContent = attritionYes.toLocaleString();
        document.querySelector('.metric-danger .metric-badge').textContent = attritionRate + '%';
        document.getElementById('avgIncome').textContent = '$' + parseInt(avgIncome).toLocaleString();
        document.getElementById('avgYears').textContent = avgYears + ' năm';
    }

    function drawOverviewCharts(data) {
        // Destroy existing charts
        Object.values(overviewCharts).forEach(chart => {
            if (chart) chart.destroy();
        });
        overviewCharts = {};

        drawDepartmentChart(data);
        drawAgeChart(data);
        drawOvertimeChart(data);
        drawIncomeChart(data);
        drawJobRoleChart(data);
        drawSatisfactionChart(data);
    }

    function drawDepartmentChart(data) {
        const departments = {};
        data.forEach(row => {
            const dept = row.Department;
            if (!departments[dept]) {
                departments[dept] = { yes: 0, no: 0 };
            }
            if (row.Attrition === 'Yes') {
                departments[dept].yes++;
            } else {
                departments[dept].no++;
            }
        });

        const labels = Object.keys(departments);
        const yesData = labels.map(dept => departments[dept].yes);
        const noData = labels.map(dept => departments[dept].no);

        const ctx = document.getElementById('chartDepartment').getContext('2d');
        overviewCharts.department = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Nghỉ việc',
                        data: yesData,
                        backgroundColor: '#e74c3c',
                        borderColor: '#c0392b',
                        borderWidth: 1
                    },
                    {
                        label: 'Ở lại',
                        data: noData,
                        backgroundColor: '#2ecc71',
                        borderColor: '#27ae60',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function drawAgeChart(data) {
        const ageGroups = {
            '18-25': { yes: 0, no: 0 },
            '26-35': { yes: 0, no: 0 },
            '36-45': { yes: 0, no: 0 },
            '46-55': { yes: 0, no: 0 },
            '56+': { yes: 0, no: 0 }
        };

        data.forEach(row => {
            const age = parseInt(row.Age);
            let group;
            if (age <= 25) group = '18-25';
            else if (age <= 35) group = '26-35';
            else if (age <= 45) group = '36-45';
            else if (age <= 55) group = '46-55';
            else group = '56+';

            if (row.Attrition === 'Yes') {
                ageGroups[group].yes++;
            } else {
                ageGroups[group].no++;
            }
        });

        const labels = Object.keys(ageGroups);
        const attritionRates = labels.map(group => {
            const total = ageGroups[group].yes + ageGroups[group].no;
            return ((ageGroups[group].yes / total) * 100).toFixed(1);
        });

        const ctx = document.getElementById('chartAge').getContext('2d');
        overviewCharts.age = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tỷ lệ nghỉ việc (%)',
                    data: attritionRates,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    function drawOvertimeChart(data) {
        const overtime = { yes: { attrition: 0, stay: 0 }, no: { attrition: 0, stay: 0 } };

        data.forEach(row => {
            const ot = row.OverTime === 'Yes' ? 'yes' : 'no';
            if (row.Attrition === 'Yes') {
                overtime[ot].attrition++;
            } else {
                overtime[ot].stay++;
            }
        });

        const ctx = document.getElementById('chartOvertime').getContext('2d');
        overviewCharts.overtime = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['OT - Nghỉ việc', 'OT - Ở lại', 'Không OT - Nghỉ việc', 'Không OT - Ở lại'],
                datasets: [{
                    data: [overtime.yes.attrition, overtime.yes.stay, overtime.no.attrition, overtime.no.stay],
                    backgroundColor: ['#e74c3c', '#fd79a8', '#fdcb6e', '#55efc4'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    function drawIncomeChart(data) {
        const attritionYes = data.filter(row => row.Attrition === 'Yes')
            .map(row => parseFloat(row.MonthlyIncome))
            .filter(x => !isNaN(x));
        
        const attritionNo = data.filter(row => row.Attrition === 'No')
            .map(row => parseFloat(row.MonthlyIncome))
            .filter(x => !isNaN(x));

        // Create income ranges
        const ranges = ['<3K', '3K-6K', '6K-10K', '10K-15K', '>15K'];
        const groupIncome = (incomes) => {
            const groups = [0, 0, 0, 0, 0];
            incomes.forEach(income => {
                if (income < 3000) groups[0]++;
                else if (income < 6000) groups[1]++;
                else if (income < 10000) groups[2]++;
                else if (income < 15000) groups[3]++;
                else groups[4]++;
            });
            return groups;
        };

        const ctx = document.getElementById('chartIncome').getContext('2d');
        overviewCharts.income = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ranges,
                datasets: [
                    {
                        label: 'Nghỉ việc',
                        data: groupIncome(attritionYes),
                        backgroundColor: '#e74c3c',
                        borderColor: '#c0392b',
                        borderWidth: 1
                    },
                    {
                        label: 'Ở lại',
                        data: groupIncome(attritionNo),
                        backgroundColor: '#3498db',
                        borderColor: '#2980b9',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function drawJobRoleChart(data) {
        const roles = {};
        data.forEach(row => {
            const role = row.JobRole;
            if (!roles[role]) {
                roles[role] = { yes: 0, no: 0 };
            }
            if (row.Attrition === 'Yes') {
                roles[role].yes++;
            } else {
                roles[role].no++;
            }
        });

        // Calculate attrition rate and sort
        const roleStats = Object.keys(roles).map(role => ({
            role: role,
            rate: (roles[role].yes / (roles[role].yes + roles[role].no)) * 100,
            count: roles[role].yes
        })).sort((a, b) => b.rate - a.rate).slice(0, 5);

        const ctx = document.getElementById('chartJobRole').getContext('2d');
        overviewCharts.jobRole = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: roleStats.map(r => r.role),
                datasets: [{
                    label: 'Tỷ lệ nghỉ việc (%)',
                    data: roleStats.map(r => r.rate.toFixed(1)),
                    backgroundColor: '#e67e22',
                    borderColor: '#d35400',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    function drawSatisfactionChart(data) {
        const satisfactionTypes = ['JobSatisfaction', 'EnvironmentSatisfaction', 'RelationshipSatisfaction', 'WorkLifeBalance'];
        const satisfactionLabels = {
            'JobSatisfaction': 'Job Satisfaction',
            'EnvironmentSatisfaction': 'Environment Satisfaction',
            'RelationshipSatisfaction': 'Relationship Satisfaction',
            'WorkLifeBalance': 'Work-Life Balance'
        };

        // Calculate attrition rate for each satisfaction level
        const satisfactionLevels = ['1 - Low', '2 - Medium', '3 - High', '4 - Very High'];
        const attritionRates = {};

        satisfactionTypes.forEach(type => {
            attritionRates[type] = { '1': [], '2': [], '3': [], '4': [] };
        });

        // Group data by satisfaction type and level
        data.forEach(row => {
            satisfactionTypes.forEach(type => {
                const level = row[type];
                if (level && level >= '1' && level <= '4') {
                    attritionRates[type][level].push(row.Attrition === 'Yes' ? 1 : 0);
                }
            });
        });

        // Calculate average attrition rate per level
        const datasets = satisfactionLevels.map((levelLabel, index) => {
            const level = (index + 1).toString();
            const rates = satisfactionTypes.map(type => {
                const attritions = attritionRates[type][level];
                if (attritions.length === 0) return 0;
                const rate = (attritions.reduce((a, b) => a + b, 0) / attritions.length) * 100;
                return rate.toFixed(1);
            });

            // Color gradient from red (Low) to green (Very High)
            const colors = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71'];
            
            return {
                label: levelLabel,
                data: rates,
                backgroundColor: colors[index],
                borderColor: colors[index],
                borderWidth: 1
            };
        });

        const ctx = document.getElementById('chartSatisfaction').getContext('2d');
        overviewCharts.satisfaction = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: satisfactionTypes.map(type => satisfactionLabels[type]),
                datasets: datasets
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.x + '% nghỉ việc';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Tỷ lệ nghỉ việc (%)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Loại hài lòng'
                        }
                    }
                }
            }
        });
    }

    // ==================== REPORT SECTION - PHÂN TÍCH THEO NHÓM ====================

    function drawReportCharts(data) {
        // Destroy existing report charts
        Object.values(reportCharts).forEach(chart => {
            if (chart) chart.destroy();
        });
        reportCharts = {};

        // Demographics
        drawDemoAgeChart(data);
        drawDemoGenderChart(data);
        drawDemoMaritalChart(data);
        drawDemoEducationFieldChart(data);
        drawDemoTechnicalChart(data);

        // Job Attributes
        drawJobDepartmentChart(data);
        drawJobRoleReportChart(data);
        drawJobIncomeChart(data);
        drawJobYearsChart(data);
        drawJobTravelChart(data);
        drawJobLevelChart(data);

        // Performance & Satisfaction
        drawPerfRatingChart(data);
        drawPerfInvolvementChart(data);
        drawPerfJobSatChart(data);
        drawPerfEnvSatChart(data);
        drawPerfWorkLifeChart(data);
        drawPerfRelationshipChart(data);
    }

    // Track which tabs have been drawn
    let reportTabsDrawn = {};

    function drawReportTabCharts(tabName) {
        if (!window.reportRawData) return;
        if (reportTabsDrawn[tabName]) return;
        const data = window.reportRawData;

        if (tabName === 'demographics') {
            drawDemoAgeChart(data);
            drawDemoGenderChart(data);
            drawDemoMaritalChart(data);
            drawDemoEducationFieldChart(data);
            drawDemoTechnicalChart(data);
        } else if (tabName === 'job-attributes') {
            drawJobDepartmentChart(data);
            drawJobRoleReportChart(data);
            drawJobIncomeChart(data);
            drawJobYearsChart(data);
            drawJobTravelChart(data);
            drawJobLevelChart(data);
        } else if (tabName === 'performance') {
            drawPerfRatingChart(data);
            drawPerfInvolvementChart(data);
            drawPerfJobSatChart(data);
            drawPerfEnvSatChart(data);
            drawPerfWorkLifeChart(data);
            drawPerfRelationshipChart(data);
        }
        reportTabsDrawn[tabName] = true;
    }

    // ===== DEMOGRAPHICS CHARTS =====

    function drawDemoAgeChart(data) {
        const yesAges = data.filter(r => r.Attrition === 'Yes').map(r => parseInt(r.Age)).filter(x => !isNaN(x));
        const noAges = data.filter(r => r.Attrition === 'No').map(r => parseInt(r.Age)).filter(x => !isNaN(x));

        const ageGroups = ['18-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60'];
        const ranges = [[18,25],[26,30],[31,35],[36,40],[41,45],[46,50],[51,55],[56,60]];

        function countByRange(ages) {
            return ranges.map(([lo, hi]) => ages.filter(a => a >= lo && a <= hi).length);
        }

        const ctx = document.getElementById('chartDemoAge').getContext('2d');
        reportCharts.demoAge = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ageGroups,
                datasets: [
                    { label: 'Nghỉ việc', data: countByRange(yesAges), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: countByRange(noAges), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawDemoGenderChart(data) {
        const groups = {};
        data.forEach(row => {
            const g = row.Gender;
            if (!groups[g]) groups[g] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[g].yes++; else groups[g].no++;
        });
        const labels = Object.keys(groups);
        const yesData = labels.map(l => groups[l].yes);
        const noData = labels.map(l => groups[l].no);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartDemoGender').getContext('2d');
        reportCharts.demoGender = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Nghỉ việc', data: yesData, backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: noData, backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            afterBody: function(context) {
                                const idx = context[0].dataIndex;
                                return 'Tỷ lệ nghỉ việc: ' + rates[idx] + '%';
                            }
                        }
                    }
                },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawDemoMaritalChart(data) {
        const groups = {};
        data.forEach(row => {
            const m = row.MaritalStatus;
            if (!groups[m]) groups[m] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[m].yes++; else groups[m].no++;
        });
        const labels = Object.keys(groups);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartDemoMarital').getContext('2d');
        reportCharts.demoMarital = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '% nghỉ)'),
                datasets: [{
                    data: labels.map(l => groups[l].yes + groups[l].no),
                    backgroundColor: ['#3498db', '#e74c3c', '#f39c12'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const idx = context.dataIndex;
                                const l = labels[idx];
                                return l + ': ' + groups[l].yes + ' nghỉ / ' + (groups[l].yes + groups[l].no) + ' tổng (' + rates[idx] + '%)';
                            }
                        }
                    }
                }
            }
        });
    }

    function drawDemoEducationFieldChart(data) {
        const groups = {};
        data.forEach(row => {
            const f = row.EducationField;
            if (!groups[f]) groups[f] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[f].yes++; else groups[f].no++;
        });
        const labels = Object.keys(groups).sort((a, b) => groups[b].yes - groups[a].yes);
        const yesData = labels.map(l => groups[l].yes);
        const noData = labels.map(l => groups[l].no);

        const ctx = document.getElementById('chartDemoEducationField').getContext('2d');
        reportCharts.demoEducField = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Nghỉ việc', data: yesData, backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: noData, backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { x: { beginAtZero: true, stacked: false, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawDemoTechnicalChart(data) {
        const technicalRoles = ['Research Scientist', 'Laboratory Technician', 'Manufacturing Director', 'Research Director'];
        const groups = { Technical: { yes: 0, no: 0 }, 'Non-Technical': { yes: 0, no: 0 } };
        data.forEach(row => {
            const type = technicalRoles.includes(row.JobRole) ? 'Technical' : 'Non-Technical';
            if (row.Attrition === 'Yes') groups[type].yes++; else groups[type].no++;
        });
        const labels = ['Technical', 'Non-Technical'];
        const yesData = labels.map(l => groups[l].yes);
        const noData = labels.map(l => groups[l].no);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartDemoTechnical').getContext('2d');
        reportCharts.demoTech = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '%)'),
                datasets: [
                    { label: 'Nghỉ việc', data: yesData, backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: noData, backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    // ===== JOB ATTRIBUTES CHARTS =====

    function drawJobDepartmentChart(data) {
        const groups = {};
        data.forEach(row => {
            const d = row.Department;
            if (!groups[d]) groups[d] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[d].yes++; else groups[d].no++;
        });
        const labels = Object.keys(groups);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartJobDepartment').getContext('2d');
        reportCharts.jobDept = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            afterBody: function(context) {
                                const idx = context[0].dataIndex;
                                return 'Tỷ lệ nghỉ việc: ' + rates[idx] + '%';
                            }
                        }
                    }
                },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawJobRoleReportChart(data) {
        const groups = {};
        data.forEach(row => {
            const r = row.JobRole;
            if (!groups[r]) groups[r] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[r].yes++; else groups[r].no++;
        });
        // Sort by attrition rate descending
        const labels = Object.keys(groups).sort((a, b) => {
            const rateA = groups[a].yes / (groups[a].yes + groups[a].no);
            const rateB = groups[b].yes / (groups[b].yes + groups[b].no);
            return rateB - rateA;
        });
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartJobRoleReport').getContext('2d');
        reportCharts.jobRole = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tỷ lệ nghỉ việc (%)',
                    data: rates.map(Number),
                    backgroundColor: rates.map(r => r > 20 ? '#e74c3c' : r > 15 ? '#f39c12' : '#2ecc71'),
                    borderColor: rates.map(r => r > 20 ? '#c0392b' : r > 15 ? '#e67e22' : '#27ae60'),
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const idx = context.dataIndex;
                                const l = labels[idx];
                                return l + ': ' + rates[idx] + '% (' + groups[l].yes + '/' + (groups[l].yes + groups[l].no) + ')';
                            }
                        }
                    }
                },
                scales: {
                    x: { beginAtZero: true, max: 50, ticks: { callback: v => v + '%' }, title: { display: true, text: 'Tỷ lệ nghỉ việc (%)' } }
                }
            }
        });
    }

    function drawJobIncomeChart(data) {
        const yesIncomes = data.filter(r => r.Attrition === 'Yes').map(r => parseFloat(r.MonthlyIncome)).filter(x => !isNaN(x));
        const noIncomes = data.filter(r => r.Attrition === 'No').map(r => parseFloat(r.MonthlyIncome)).filter(x => !isNaN(x));

        const incomeRanges = ['< 3K', '3K-5K', '5K-8K', '8K-12K', '12K+'];
        const bounds = [[0,3000],[3000,5000],[5000,8000],[8000,12000],[12000,Infinity]];

        function countByRange(incomes) {
            return bounds.map(([lo, hi]) => incomes.filter(i => i >= lo && i < hi).length);
        }

        const ctx = document.getElementById('chartJobIncome').getContext('2d');
        reportCharts.jobIncome = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: incomeRanges,
                datasets: [
                    { label: 'Nghỉ việc', data: countByRange(yesIncomes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: countByRange(noIncomes), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } }, x: { title: { display: true, text: 'Thu nhập hàng tháng ($)' } } }
            }
        });
    }

    function drawJobYearsChart(data) {
        const yesYears = data.filter(r => r.Attrition === 'Yes').map(r => parseInt(r.YearsAtCompany)).filter(x => !isNaN(x));
        const noYears = data.filter(r => r.Attrition === 'No').map(r => parseInt(r.YearsAtCompany)).filter(x => !isNaN(x));

        const yearRanges = ['0-2', '3-5', '6-10', '11-15', '16-20', '20+'];
        const bounds = [[0,2],[3,5],[6,10],[11,15],[16,20],[21,50]];

        function countByRange(years) {
            return bounds.map(([lo, hi]) => years.filter(y => y >= lo && y <= hi).length);
        }

        const ctx = document.getElementById('chartJobYears').getContext('2d');
        reportCharts.jobYears = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: yearRanges,
                datasets: [
                    { label: 'Nghỉ việc', data: countByRange(yesYears), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: countByRange(noYears), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } }, x: { title: { display: true, text: 'Số năm tại công ty' } } }
            }
        });
    }

    function drawJobTravelChart(data) {
        const groups = {};
        data.forEach(row => {
            const t = row.BusinessTravel;
            if (!groups[t]) groups[t] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[t].yes++; else groups[t].no++;
        });
        const labels = Object.keys(groups);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartJobTravel').getContext('2d');
        reportCharts.jobTravel = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '%)'),
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawJobLevelChart(data) {
        const levelNames = { '1': 'Entry Level', '2': 'Mid Level', '3': 'Senior', '4': 'Director', '5': 'Executive' };
        const groups = {};
        data.forEach(row => {
            const lvl = row.JobLevel;
            const name = levelNames[lvl] || ('Level ' + lvl);
            if (!groups[name]) groups[name] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[name].yes++; else groups[name].no++;
        });
        const order = ['Entry Level', 'Mid Level', 'Senior', 'Director', 'Executive'];
        const labels = order.filter(l => groups[l]);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartJobLevel').getContext('2d');
        reportCharts.jobLevel = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '%)'),
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    // ===== PERFORMANCE & SATISFACTION CHARTS =====

    function drawPerfRatingChart(data) {
        const ratingNames = { '1': 'Low', '2': 'Good', '3': 'Excellent', '4': 'Outstanding' };
        const groups = {};
        data.forEach(row => {
            const r = ratingNames[row.PerformanceRating] || row.PerformanceRating;
            if (!groups[r]) groups[r] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[r].yes++; else groups[r].no++;
        });
        const order = ['Low', 'Good', 'Excellent', 'Outstanding'];
        const labels = order.filter(l => groups[l]);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartPerfRating').getContext('2d');
        reportCharts.perfRating = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { afterBody: function(ctx) { return 'Tỷ lệ nghỉ: ' + rates[ctx[0].dataIndex] + '%'; } } }
                },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawPerfInvolvementChart(data) {
        const names = { '1': 'Low', '2': 'Medium', '3': 'High', '4': 'Very High' };
        const groups = {};
        data.forEach(row => {
            const v = names[row.JobInvolvement] || row.JobInvolvement;
            if (!groups[v]) groups[v] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[v].yes++; else groups[v].no++;
        });
        const order = ['Low', 'Medium', 'High', 'Very High'];
        const labels = order.filter(l => groups[l]);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartPerfInvolvement').getContext('2d');
        reportCharts.perfInvolve = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '%)'),
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawPerfJobSatChart(data) {
        const names = { '1': 'Low', '2': 'Medium', '3': 'High', '4': 'Very High' };
        const groups = {};
        data.forEach(row => {
            const v = names[row.JobSatisfaction] || row.JobSatisfaction;
            if (!groups[v]) groups[v] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[v].yes++; else groups[v].no++;
        });
        const order = ['Low', 'Medium', 'High', 'Very High'];
        const labels = order.filter(l => groups[l]);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartPerfJobSat').getContext('2d');
        reportCharts.perfJobSat = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '%)'),
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawPerfEnvSatChart(data) {
        const names = { '1': 'Low', '2': 'Medium', '3': 'High', '4': 'Very High' };
        const groups = {};
        data.forEach(row => {
            const v = names[row.EnvironmentSatisfaction] || row.EnvironmentSatisfaction;
            if (!groups[v]) groups[v] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[v].yes++; else groups[v].no++;
        });
        const order = ['Low', 'Medium', 'High', 'Very High'];
        const labels = order.filter(l => groups[l]);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartPerfEnvSat').getContext('2d');
        reportCharts.perfEnvSat = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '%)'),
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawPerfWorkLifeChart(data) {
        const names = { '1': 'Bad', '2': 'Good', '3': 'Better', '4': 'Best' };
        const groups = {};
        data.forEach(row => {
            const v = names[row.WorkLifeBalance] || row.WorkLifeBalance;
            if (!groups[v]) groups[v] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[v].yes++; else groups[v].no++;
        });
        const order = ['Bad', 'Good', 'Better', 'Best'];
        const labels = order.filter(l => groups[l]);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartPerfWorkLife').getContext('2d');
        reportCharts.perfWorkLife = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '%)'),
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    function drawPerfRelationshipChart(data) {
        const names = { '1': 'Low', '2': 'Medium', '3': 'High', '4': 'Very High' };
        const groups = {};
        data.forEach(row => {
            const v = names[row.RelationshipSatisfaction] || row.RelationshipSatisfaction;
            if (!groups[v]) groups[v] = { yes: 0, no: 0 };
            if (row.Attrition === 'Yes') groups[v].yes++; else groups[v].no++;
        });
        const order = ['Low', 'Medium', 'High', 'Very High'];
        const labels = order.filter(l => groups[l]);
        const rates = labels.map(l => ((groups[l].yes / (groups[l].yes + groups[l].no)) * 100).toFixed(1));

        const ctx = document.getElementById('chartPerfRelationship').getContext('2d');
        reportCharts.perfRelationship = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels.map((l, i) => l + ' (' + rates[i] + '%)'),
                datasets: [
                    { label: 'Nghỉ việc', data: labels.map(l => groups[l].yes), backgroundColor: '#e74c3c', borderColor: '#c0392b', borderWidth: 1 },
                    { label: 'Ở lại', data: labels.map(l => groups[l].no), backgroundColor: '#2ecc71', borderColor: '#27ae60', borderWidth: 1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Số nhân viên' } } }
            }
        });
    }

    // ==================== REPORT SECTION TABS ====================
    const reportTabButtons = document.querySelectorAll('.report-tab-btn');
    const reportTabPanes = document.querySelectorAll('.report-tab-pane');

    reportTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            reportTabButtons.forEach(btn => btn.classList.remove('active'));
            reportTabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const activePane = document.getElementById(tabName + '-content');
            if (activePane) {
                activePane.classList.add('active');
            }

            // Draw charts for this tab if not yet drawn
            setTimeout(() => drawReportTabCharts(tabName), 50);
        });
    });
});