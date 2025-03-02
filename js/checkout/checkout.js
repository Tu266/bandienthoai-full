const cartKey = 'cart';  // Key để lưu giỏ hàng trong localStorage

function renderCart() {
    const cartContainer = document.querySelector(".table tbody");
    const subtotalElement = document.querySelector(".subtotal-price");
    const totalElement = document.querySelector(".total-price");

    if (!cartContainer) {
        console.log("Không tìm thấy phần tử giỏ hàng");
        return;
    }
    // Lấy dữ liệu giỏ hàng từ localStorage
    const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

    console.log("Dữ liệu giỏ hàng:", cartItems);  // Debug giỏ hàng

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="5" class="text-center py-5">Giỏ hàng của bạn trống!</td></tr>';
        subtotalElement.textContent = "0 VND";
        totalElement.textContent = "0 VND";
        return;
    }

    let subtotal = 0;
    const cartHTML = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        return `
            <tr>
                <th scope="row">
                    <div class="d-flex align-items-center mt-2">
                        <img src="${product.images[0]}" class="img-fluid rounded-circle" style="width: 90px; height: 90px;" alt="${product.name}">
                    </div>
                </th>
                <td class="py-5">${product.name}</td>
                <td class="py-5">${product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                <td class="py-5">${item.quantity}</td>
                <td class="py-5">${itemTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            </tr>
        `;
    }).join('');

    cartContainer.innerHTML = cartHTML;

    // Cập nhật Subtotal và Total
    subtotalElement.textContent = `${subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;
    totalElement.textContent = `${subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;  // Total = Subtotal
}

// Khi tải trang, gọi hàm renderCart
document.addEventListener("DOMContentLoaded", renderCart);
