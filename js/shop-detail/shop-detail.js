// Lấy productId từ localStorage
const productId = localStorage.getItem("selectedProductId");
const productDetailContainer = document.querySelector(".product-detail");

// Lấy sản phẩm theo productId
const product = products.find(p => p.id == productId);

function renderProductDetail() {
    if (!productDetailContainer) {
        console.error("Không tìm thấy phần tử .product-detail");
        return;
    }
    if (product) {
        const starRating = generateStarRating(product.avgRating);
        const productPrice = product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        const productOldPrice = product.oldPrice ? product.oldPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "";

        // Ảnh lớn mặc định là ảnh đầu tiên
        const productMainImage = `
            <div class="border rounded mb-3">
                <img src="${product.images[0]}" id="main-product-image" class="img-fluid rounded" alt="Product Image">
            </div>
        `;

        // Danh sách ảnh nhỏ bên dưới ảnh lớn
        const productThumbnails = product.images.map((img, index) => `
            <img src="${img}" class="img-thumbnail me-2 mb-2 product-thumbnail" style="width: 80px; cursor: pointer;" onclick="changeMainImage('${img}')">
        `).join('');

        // Danh sách màu sắc
        const productColors = product.colors.map((color, index) => `
            <button class="btn btn-outline-secondary rounded-pill me-2 mb-2 product-color ${index === 0 ? 'active' : ''}" 
                onclick="selectColor(this)">
                ${color}
            </button>
        `).join('');

        // Danh sách options
        const productOptions = product.options.map((option, index) => `
            <button class="btn btn-outline-secondary rounded-pill me-2 mb-2 product-option ${index === 0 ? 'active' : ''}" 
                onclick="selectOption(this)">
                ${option}
            </button>
        `).join('');

        productDetailContainer.innerHTML = `
            <div class="row g-4">
                <div class="col-lg-6">
                    ${productMainImage}
                    <div class="d-flex flex-wrap">
                        ${productThumbnails}
                    </div>
                </div>
                <div class="col-lg-6">
                    <h4 class="fw-bold mb-3">${product.name}</h4>
                    <p class="mb-3">Danh mục: ${product.category}</p>
                    <h5 class="fw-bold mb-3">${productPrice}</h5>
                    ${productOldPrice ? `<h5 class="text-danger text-decoration-line-through">${productOldPrice}</h5>` : ""}
                    <div class="d-flex mb-4">
                        ${starRating}
                    </div>

                    <div class="mb-3">
                        <p class="fw-bold mb-2">Chọn màu:</p>
                        <div class="d-flex flex-wrap">
                            ${productColors}
                        </div>
                    </div>

                    <div class="mb-3">
                        <p class="fw-bold mb-2">Chọn option:</p>
                        <div class="d-flex flex-wrap">
                            ${productOptions}
                        </div>
                    </div>

                    <p class="mb-4">${product.description}</p>
                    <div class="input-group quantity mb-5" style="width: 100px;">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-minus rounded-circle bg-light border">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control form-control-sm text-center border-0" value="1">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-plus rounded-circle bg-light border">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                   <a href="#" onclick="addToCart()" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
    <i class="fa fa-shopping-bag me-2 text-primary"></i> Thêm vào giỏ hàng
</a>

                </div>
                <div class="col-lg-12">
                    <nav>
                        <div class="nav nav-tabs mb-3">
                            <button class="nav-link active border-white border-bottom-0" type="button" role="tab"
                                id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                aria-controls="nav-about" aria-selected="true">Description</button>
                            <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                                id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                aria-controls="nav-mission" aria-selected="false">Reviews</button>
                        </div>
                    </nav>
                    <div class="tab-content mb-5">
                        <div class="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                            <p>${product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        productDetailContainer.innerHTML = '<p class="text-center">Không tìm thấy sản phẩm này.</p>';
    }
}

// Hàm đổi ảnh lớn khi bấm vào ảnh nhỏ
function changeMainImage(imgSrc) {
    const mainImage = document.getElementById("main-product-image");
    if (mainImage) mainImage.src = imgSrc;
}

// Hàm chọn màu
function selectColor(element) {
    const colorButtons = document.querySelectorAll(".product-color");
    colorButtons.forEach(btn => btn.classList.remove("active"));
    element.classList.add("active");
}

// Hàm chọn option
function selectOption(element) {
    const optionButtons = document.querySelectorAll(".product-option");
    optionButtons.forEach(btn => btn.classList.remove("active"));
    element.classList.add("active");
}


// Lấy danh sách danh mục sản phẩm
function renderCategoryList() {
    const categoryCount = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const categoryContainer = document.querySelector(".fruite-categorie");
    categoryContainer.innerHTML = ""; // Xóa danh mục cũ

    Object.keys(categoryCount).forEach(category => {
        const categoryItem = document.createElement("li");
        categoryItem.innerHTML = `
            <div class="d-flex justify-content-between fruite-name">
                <a href="/shop.html" onclick="filterProducts('${category}')">${category}</a>
                <span>(${categoryCount[category]})</span>
            </div>
        `;
        categoryContainer.appendChild(categoryItem);
    });
}
function renderFeaturedProducts() {
    const featuredContainer = document.querySelector(".featured-products");
    if (!featuredContainer) {
        console.error("Không tìm thấy phần tử .featured-products");
        return;
    }

    // Lọc các sản phẩm có avgRating >= 4.5
    const featuredProducts = products.filter(product => product.avgRating === 4.5);

    // Tạo danh sách sản phẩm nổi bật
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="d-flex align-items-center justify-content-start mb-3">
            <div class="rounded" style="width: 100px; height: 100px;">
                <img src="${product.images[0]}" class="img-fluid rounded" alt="${product.name}">
            </div>
            <div class="ms-3">
                <h6 class="mb-2">${product.name}</h6>
                <div class="d-flex mb-2">
                    ${generateStarRating(product.avgRating)}
                </div>
                <div class="d-flex mb-2">
                    <h5 class="fw-bold me-2">${product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                    ${product.oldPrice ? `<h5 class="text-danger text-decoration-line-through">${product.oldPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>` : ""}
                </div>
            </div>
        </div>
    `).join('');

    // Nếu không có sản phẩm nổi bật
    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p class="text-center">Không có sản phẩm nổi bật.</p>';
    }
}

// Lấy sản phẩm liên quan cùng danh mục
function renderRelatedProducts() {
    const relatedContainer = document.querySelector(".vegetable-carousel");
    if (!relatedContainer) {
        console.error("Không tìm thấy phần tử .vegetable-carousel");
        return;
    }

    // Lọc sản phẩm cùng danh mục nhưng khác id
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id);

    // Tạo danh sách sản phẩm liên quan
    relatedContainer.innerHTML = relatedProducts.map(p => `
        <div class="border border-primary rounded position-relative vesitable-item">
            <div class="vesitable-img">
                <img src="${p.images[0]}" class="img-fluid w-100 rounded-top" alt="${p.name}">
            </div>
            <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style="top: 10px; right: 10px;">${p.category}</div>
            <div class="p-4 pb-0 rounded-bottom">
               <h4 class="product-name" title="${p.name}"
                        style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 17px; cursor: pointer;" 
                        onclick="viewProductDetail(${p.id})">
                        ${p.name}
                    </h4>
                <p>${p.description.slice(0, 60)}...</p>
                <div class="d-flex justify-content-between flex-lg-wrap">
                    <p class="text-dark fs-5 fw-bold">${p.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    <a href="#" onclick="viewProductDetail(${p.id})" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary">
                        <i class="fa fa-shopping-bag me-2 text-primary"></i> Xem chi tiết
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Nếu không có sản phẩm liên quan
    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<p class="text-center">Không có sản phẩm liên quan.</p>';
    }

    // Khởi động lại carousel sau khi thêm sản phẩm
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


function generateStarRating(avgRating) {
    const fullStars = Math.floor(avgRating);
    const halfStar = avgRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        `${'<i class="fa fa-star text-secondary"></i>'.repeat(fullStars)}` +
        `${halfStar ? '<i class="fa fa-star-half text-secondary"></i>' : ''}` +
        `${'<i class="fa fa-star text-secondary"></i>'.repeat(emptyStars)}`
    );
}
// Hàm chuyển sang trang chi tiết sản phẩm
function viewProductDetail(productId) {
    localStorage.setItem("selectedProductId", productId);
    window.location.href = "/shop-detail.html";
}

// Tải dữ liệu khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    renderProductDetail();
    renderCategoryList();
    renderFeaturedProducts();
    renderRelatedProducts();
});
