// Hàm thêm sản phẩm vào giỏ hàng
function addToCart() {
    // Lấy thông tin sản phẩm hiện tại
    if (!product) return;

    // Kiểm tra xem người dùng đã chọn màu chưa
    const selectedColorElement = document.querySelector(".product-color.active");
    if (!selectedColorElement) {
        alert("Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng!");
        return;
    }
    const selectedColor = selectedColorElement.innerText;

    // Kiểm tra xem người dùng đã chọn option chưa
    const selectedOptionElement = document.querySelector(".product-option.active");
    if (!selectedOptionElement) {
        alert("Vui lòng chọn tùy chọn trước khi thêm vào giỏ hàng!");
        return;
    }
    const selectedOption = selectedOptionElement.innerText;

    // Lấy số lượng
    const quantityInput = document.querySelector(".quantity input");
    const quantity = parseInt(quantityInput?.value) || 1;

    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(
        item => item.id === product.id && item.color === selectedColor && item.option === selectedOption
    );

    if (existingProductIndex > -1) {
        // Nếu có rồi, tăng số lượng
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Nếu chưa có, thêm sản phẩm mới
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            color: selectedColor,
            option: selectedOption,
            quantity: quantity,
            image: product.images[0] // Lấy ảnh đầu tiên làm ảnh đại diện
        });
    }

    // Cập nhật lại giỏ hàng trong localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Thông báo thêm vào giỏ hàng thành công
    alert("Đã thêm vào giỏ hàng!");
}
// Hàm lấy giỏ hàng từ localStorage và hiển thị lên trang
function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.querySelector(".table tbody");
    const subtotalElement = document.querySelector(".subtotal-price");
    const totalElement = document.querySelector(".total-price");
    const shippingCost = 0; // 30,000 VND phí vận chuyển
    let subtotal = 0;

    // Kiểm tra phần tử có tồn tại không
    if (!cartTableBody || !subtotalElement || !totalElement) {
        console.error("Không tìm thấy phần tử giỏ hàng.");
        return;
    }

    // Nếu giỏ hàng rỗng
    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Giỏ hàng của bạn đang trống!</td></tr>';
        subtotalElement.innerText = "0 VND";
        totalElement.innerText = "0 VND";
        return;
    }

    // Render sản phẩm trong giỏ hàng
    cartTableBody.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        return `
            <tr>
                <th scope="row">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="${item.name}">
                    </div>
                </th>
                <td>
                    <p class="mb-0 mt-4">${item.name}</p>
                    <p class="text-muted mb-0">Màu: ${item.color} | Option: ${item.option}</p>
                </td>
                <td>
                    <p class="mb-0 mt-4">${item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </td>
                <td>
                    <div class="input-group quantity mt-4" style="width: 100px;">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-minus rounded-circle bg-light border" onclick="updateQuantity(${index}, -1)">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control form-control-sm text-center border-0" value="${item.quantity}" readonly>
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-plus rounded-circle bg-light border" onclick="updateQuantity(${index}, 1)">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <p class="mb-0 mt-4">${itemTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </td>
                <td>
                    <button class="btn btn-md rounded-circle bg-light border mt-4" onclick="removeFromCart(${index})">
                        <i class="fa fa-times text-danger"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    // Cập nhật tổng tiền
    const total = subtotal + shippingCost;
    subtotalElement.innerText = subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    totalElement.innerText = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

// Hàm cập nhật số lượng sản phẩm
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index]) {
        cart[index].quantity = Math.max(1, cart[index].quantity + change); // Không cho phép số lượng < 1
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Render lại giỏ hàng sau khi cập nhật
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index]) {
        cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Render lại giỏ hàng sau khi xóa
    }
}

// Gọi hàm renderCart khi tải trang
document.addEventListener("DOMContentLoaded", renderCart);
