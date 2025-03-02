let currentCategory = 'All';
let currentSort = 'default';
let searchKeyword = '';
let currentPage = 1;
const productsPerPage = 6;
let priceRange = 50000000; // Mặc định 50 triệu

// Sắp xếp sản phẩm theo lựa chọn
function sortProducts(products) {
    if (currentSort === 'popularity') {
        return products.sort((a, b) => b.avgRating - a.avgRating);
    } else if (currentSort === 'price-asc') {
        return products.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        return products.sort((a, b) => b.price - a.price);
    }
    return products;
}

// Tìm kiếm sản phẩm theo từ khóa
function searchProducts(products) {
    if (searchKeyword.trim() !== '') {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            product.description.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    }
    return products;
}

// Lọc sản phẩm theo `category` và sắp xếp sản phẩm
function filterProducts(category) {
    currentCategory = category;
    currentPage = 1; // Reset về trang đầu khi đổi category
    let filteredProducts = category === 'All' ? products : products.filter(product => product.category === category);
    renderProducts(filteredProducts);
}

// Lọc sản phẩm theo giá
function filterByPrice(event) {
    priceRange = parseInt(event.target.value) * 1000000;
    currentPage = 1; // Reset về trang đầu khi đổi giá
    renderProducts();
}

// Cập nhật sắp xếp khi chọn trên dropdown
function handleSortChange(event) {
    currentSort = event.target.value;
    renderProducts();
}

// Cập nhật từ khóa tìm kiếm khi nhập
function handleSearch(event) {
    searchKeyword = event.target.value;
    currentPage = 1; // Reset về trang đầu khi tìm kiếm
    renderProducts();
}

// Lọc sản phẩm nổi bật
function getFeaturedProducts() {
    return products.filter(product => product.avgRating === 4.5);
}

// Phân trang sản phẩm
function paginateProducts(products) {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
}
function generateCategoryList() {
    const categoryCount = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const categoryContainer = document.querySelector(".fruite-categorie");
    categoryContainer.innerHTML = ""; // Xóa danh mục cũ

    const allItem = document.createElement("li");
    allItem.innerHTML = `
        <div class="d-flex justify-content-between fruite-name">
            <a href="#" onclick="filterProducts('All')">All</a>
            <span>(${products.length})</span>
        </div>
    `;
    categoryContainer.appendChild(allItem);

    Object.keys(categoryCount).forEach(category => {
        const categoryItem = document.createElement("li");
        categoryItem.innerHTML = `
            <div class="d-flex justify-content-between fruite-name">
                <a href="#" onclick="filterProducts('${category}')">${category}</a>
                <span>(${categoryCount[category]})</span>
            </div>
        `;
        categoryContainer.appendChild(categoryItem);
    });
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
// Hàm chuyển đến trang chi tiết sản phẩm và lưu productId vào localStorage
function viewProductDetail(productId) {
    localStorage.setItem("selectedProductId", productId);
    window.location.href = "/shop-detail.html";
}

// Hiển thị sản phẩm theo danh sách đã lọc, sắp xếp, tìm kiếm và phân trang
function renderProducts(filteredProducts = products) {
    const searchedProducts = searchProducts(filteredProducts);
    const priceFilteredProducts = searchedProducts.filter(product => product.price <= priceRange);
    const sortedProducts = sortProducts(priceFilteredProducts);
    const paginatedProducts = paginateProducts(sortedProducts);

    const productContainer = document.querySelector(".row.g-4.justify-content-center");
    productContainer.innerHTML = "";

    if (paginatedProducts.length === 0) {
        productContainer.innerHTML = '<p class="text-center">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    paginatedProducts.forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "col-md-6 col-lg-6 col-xl-4";
        const starRating = generateStarRating(product.avgRating);
        const productPrice = product.price ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "Liên hệ";

        productItem.innerHTML = `
            <div class="rounded position-relative fruite-item">
                <div class="fruite-img" onclick="viewProductDetail(${product.id})" style="cursor: pointer;">
                    <img src="${product.images?.[0] || 'img/default.jpg'}" class="img-fluid w-100 rounded-top" alt="${product.name}">
                </div>
                <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                    <h4 class="product-name" title="${product.name}"
                        style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 17px; cursor: pointer;" 
                        onclick="viewProductDetail(${product.id})">
                        ${product.name}
                    </h4>
                    <p>${product.description}</p>
                    <div class="d-flex mb-2">${starRating}</div>
                    <p class="text-dark fs-5 fw-bold mb-2">${productPrice}</p>
                    <a href="#" onclick="viewProductDetail(${product.id})" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Xem chi tiết</a>
                </div>
            </div>`;
        productContainer.appendChild(productItem);
    });

    renderPagination(filteredProducts.length);
}


// Hiển thị sản phẩm nổi bật
function renderFeaturedProducts() {
    const featuredContainer = document.querySelector(".featured-products");
    const featuredProducts = getFeaturedProducts();
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="d-flex align-items-center mb-3">
            <img src="${product.images[0]}" style="width: 60px; height: 60px;" class="me-3">
            <div>
                <h6>${product.name}</h6>
                <p>${product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
        </div>
    `).join('');
}

// Phân trang
function renderPagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `<a href="#" class="rounded ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</a>`;
    }
}

// Đổi trang
function changePage(page) {
    currentPage = page;
    renderProducts();
}

// Tạo danh mục sản phẩm
generateCategoryList();
renderFeaturedProducts();
renderProducts();

document.addEventListener("DOMContentLoaded", () => {
    renderFeaturedProducts();
    renderProducts();
});
