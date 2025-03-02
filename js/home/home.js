// Import data từ data.js (giả sử data.js đã khai báo biến `products`)
const categories = [...new Set(products.map(p => p.category))];  // Lấy danh mục duy nhất

// Hàm tạo tab danh mục
function renderCategoryTabs() {
    const tabContainer = document.querySelector(".nav.nav-pills");
    if (!tabContainer) return;

    let tabHTML = `
        <li class="nav-item">
            <a class="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" data-category="Tất cả">
                <span class="text-dark" style="width: 130px;">Tất cả</span>
            </a>
        </li>
    `;
    categories.forEach((category, index) => {
        tabHTML += `
            <li class="nav-item">
                <a class="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" data-category="${category}">
                    <span class="text-dark" style="width: 130px;">${category}</span>
                </a>
            </li>
        `;
    });

    tabContainer.innerHTML = tabHTML;
}

// Hàm render sản phẩm theo danh mục
function renderProductsByCategory(category = "Tất cả") {
    const productContainer = document.querySelector("#tab-1 .row.g-4");
    if (!productContainer) return;

    // Lọc sản phẩm theo danh mục
    let filteredProducts = category === "Tất cả" ? products : products.filter(p => p.category === category);
    filteredProducts = filteredProducts.slice(0, 8);  // Giới hạn tối đa 8 sản phẩm

    const productHTML = filteredProducts.map(p => `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="rounded position-relative fruite-item">
                <div class="fruite-img">
                    <img src="${p.images[0]}" class="img-fluid w-100 rounded-top" alt="${p.name}">
                </div>
                <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${p.category}</div>
                <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                    <h4 class="product-name" title="${p.name}"
                        style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 17px; cursor: pointer;" 
                        onclick="viewProductDetail(${p.id})">
                        ${p.name}
                    </h4>
                    <p>${p.description}</p>
                    <div class="d-flex justify-content-between flex-lg-wrap">
                        <p class="text-dark fs-5 fw-bold mb-0">${p.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        <a href="#" onclick="viewProductDetail(${p.id})" class="btn border border-secondary rounded-pill px-3 text-primary">
                            <i class="fa fa-shopping-bag me-2 text-primary"></i> Xem chi tiết
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    productContainer.innerHTML = productHTML;
}
// Hàm render sản phẩm đánh giá cao nhất giảm dần
function renderTopRatedProducts() {
    const topRatedContainer = document.querySelector(".toprated-product");
    if (!topRatedContainer) {
        console.log("Không tìm thấy phần tử .toprated-product");
        return;
    }

    console.log("Dữ liệu sản phẩm:", products);

    const topRatedProducts = [...products]
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 8);

    if (topRatedProducts.length === 0) {
        console.log("Không có sản phẩm nào để hiển thị!");
        topRatedContainer.innerHTML = '<p>Không có sản phẩm đánh giá cao.</p>';
        return;
    }

    const topRatedHTML = topRatedProducts.map(p => `
        <div class="item"> <!-- Thêm class .item để Owl Carousel nhận diện -->
            <div class="border border-primary rounded position-relative vesitable-item">
                <div class="vesitable-img">
                    <img src="${p.images[0]}" class="img-fluid w-100 rounded-top" alt="${p.name}">
                </div>
                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style="top: 10px; right: 10px;">${p.category}</div>
                <div class="p-4 rounded-bottom">
                    <h4 class="product-name" title="${p.name}"
                        style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 17px; cursor: pointer;" 
                        onclick="viewProductDetail(${p.id})">
                        ${p.name}
                    </h4>
                    <p>${p.description.slice(0, 60)}...</p>
                    <div class="d-flex justify-content-between flex-lg-wrap">
                        <p class="text-dark fs-5 fw-bold mb-0">${p.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        <a href="#" onclick="viewProductDetail(${p.id})" class="btn border border-secondary rounded-pill px-3 text-primary">
                            <i class="fa fa-shopping-bag me-2 text-primary"></i> Xem chi tiết
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    topRatedContainer.innerHTML = topRatedHTML;

    // Khởi tạo lại Owl Carousel sau khi render xong
    if ($('.vegetable-carousel').length > 0) {
        $('.vegetable-carousel').owlCarousel('destroy'); // Phá hủy carousel cũ nếu có
        $('.vegetable-carousel').owlCarousel({
            items: 4,
            margin: 30,
            loop: true,
            autoplay: true,
            autoplayTimeout: 3000,
            nav: true,
            dots: false,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
        });
    }
}
function renderRandomProducts() {
    const productContainer = document.querySelector(".sale-product");
    if (!productContainer) {
        console.log("Không tìm thấy phần tử .sale-product");
        return;
    }

    // Sao chép mảng sản phẩm và xáo trộn ngẫu nhiên
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    const randomProducts = shuffledProducts.slice(0, 6);  // Lấy 6 sản phẩm ngẫu nhiên

    const randomProductsHTML = randomProducts.map(p => `
        <div class="col-lg-6 col-xl-4">
            <div class="p-4 rounded bg-light">
                <div class="row align-items-center">
                    <div class="col-6">
                        <img src="${p.images[0]}" class="img-fluid rounded-circle w-100" alt="${p.name}">
                    </div>
                    <div class="col-6">
                        <a style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 15px; cursor: pointer;"  href="#" class="h5" onclick="viewProductDetail(${p.id})">${p.name}</a>
                        <div class="d-flex my-3">
                            ${generateStarRating(p.avgRating)}
                        </div>
                        <h4 class="mb-3">${p.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                        <a href="#" onclick="viewProductDetail(${p.id})" class="btn border border-secondary rounded-pill px-3 text-primary">
                            <i class="fa fa-shopping-bag me-2 text-primary"></i> Xem chi tiết
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    productContainer.innerHTML = randomProductsHTML;
}

// Hàm tạo đánh giá sao
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star text-primary"></i>';
    }
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt text-primary"></i>';
    }
    for (let i = fullStars + halfStar; i < 5; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

// Gọi hàm khi trang đã tải xong
document.addEventListener("DOMContentLoaded", () => {
    renderRandomProducts();
});

// Hàm hiển thị sản phẩm khi nhấn vào tab
function setupCategoryTabs() {
    const tabs = document.querySelectorAll(".nav-item a");
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const category = this.getAttribute("data-category").trim();
            tabs.forEach(t => t.classList.remove("active"));  // Bỏ active của tab khác
            this.classList.add("active");                      // Thêm active cho tab hiện tại
            renderProductsByCategory(category);                // Hiển thị sản phẩm theo danh mục
        });
    });
}

// Hàm gọi khi trang được load
document.addEventListener("DOMContentLoaded", () => {
    renderCategoryTabs();         // Tạo danh mục tab
    renderProductsByCategory();   // Tải tất cả sản phẩm ban đầu
    renderTopRatedProducts();
    setupCategoryTabs();          // Thiết lập sự kiện cho tab
    renderRandomProducts();
});

// Hàm xem chi tiết sản phẩm
function viewProductDetail(productId) {
    localStorage.setItem("selectedProductId", productId);
    window.location.href = "/shop-detail.html";
}
