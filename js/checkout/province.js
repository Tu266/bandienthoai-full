document.addEventListener("DOMContentLoaded", () => {
    const provinceSelect = document.getElementById("provinceSelect");
    const districtSelect = document.getElementById("districtSelect");
    const wardSelect = document.getElementById("wardSelect");

    // Lấy danh sách tỉnh/thành phố
    fetch("https://provinces.open-api.vn/api/p/")
        .then(response => response.json())
        .then(data => {
            provinceSelect.innerHTML += data.map(province => `
                <option value="${province.code}">${province.name}</option>
            `).join('');
        })
        .catch(error => console.error("Lỗi khi lấy danh sách tỉnh/thành phố:", error));

    // Khi chọn tỉnh/thành phố thì lấy danh sách quận/huyện
    provinceSelect.addEventListener("change", () => {
        const provinceCode = provinceSelect.value;
        districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
        districtSelect.disabled = !provinceCode;
        wardSelect.disabled = true;

        if (provinceCode) {
            fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
                .then(response => response.json())
                .then(data => {
                    districtSelect.innerHTML += data.districts.map(district => `
                        <option value="${district.code}">${district.name}</option>
                    `).join('');
                })
                .catch(error => console.error("Lỗi khi lấy danh sách quận/huyện:", error));
        }
    });

    // Khi chọn quận/huyện thì lấy danh sách phường/xã
    districtSelect.addEventListener("change", () => {
        const districtCode = districtSelect.value;
        wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
        wardSelect.disabled = !districtCode;

        if (districtCode) {
            fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                .then(response => response.json())
                .then(data => {
                    wardSelect.innerHTML += data.wards.map(ward => `
                        <option value="${ward.code}">${ward.name}</option>
                    `).join('');
                })
                .catch(error => console.error("Lỗi khi lấy danh sách phường/xã:", error));
        }
    });
});
