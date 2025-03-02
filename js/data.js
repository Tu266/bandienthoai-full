

const products = [
    {
        id: 1,
        name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
        category: "Điện thoại",
        price: 25000000,
        discount: 10, // Giảm giá 10%
        avgRating: 4.5, // Đánh giá trung bình
        colors: ["Đen", "Trắng", "Xanh"],
        options: ["128GB", "256GB", "512GB"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/_/v_ng_18.png", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/b/_/b_c_1_9.png"],
        description: "Điện thoại Apple iPhone 14 với màn hình 6.1 inch"
    },
    {
        id: 2,
        name: "MacBook Pro M2",
        category: "Laptop",
        price: 35000000,
        discount: 15, // Giảm giá 15%
        avgRating: 4.8, // Đánh giá trung bình
        colors: ["Xám", "Bạc"],
        options: ["256GB SSD", "512GB SSD", "1TB SSD"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/h/e/hero_13__d1tfa5zby7e6_large00_2.jpg", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/b/mbp14-silver-select-202301_1_5_1.jpg"],
        description: "Laptop Apple MacBook Pro chip M2 bản 512Gb"
    },
    {
        id: 3,
        name: "Apple Watch Series 8",
        category: "Đồng hồ",
        price: 12000000,
        discount: 5, // Giảm giá 5%
        avgRating: 4.3, // Đánh giá trung bình
        colors: ["Đen", "Đỏ", "Trắng"],
        options: ["GPS", "GPS + Cellular"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/0/1000_3_1_1_1.jpg", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/5/_/5_169_6_1_1.jpg"],
        description: "Đồng hồ thông minh Apple Watch Series 8"
    },
    {
        id: 4,
        name: "Dell XPS 13",
        category: "Laptop",
        price: 28000000,
        discount: 10,
        avgRating: 4.6,
        colors: ["Xám", "Bạc"],
        options: ["256GB SSD", "512GB SSD", "1TB SSD"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/2/0/20_6_3.jpg", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/2/1/21_4_3.jpg"],
        description: "Laptop Dell XPS 13 màn hình 4K 512Gb"
    },
    {
        id: 5,
        name: "Apple Watch Ultra 2 2024",
        category: "Đồng hồ",
        price: 12000000,
        discount: 5,
        avgRating: 4.3,
        colors: ["Đen", "Đỏ", "Trắng"],
        options: ["GPS", "GPS + Cellular"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_25__7_5.png", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_26__6_12.png"],
        description: "Apple Watch Ultra 2 2024 Chip 128"
    },
    {
        id: 6,
        name: "Samsung Galaxy Watch 5",
        category: "Đồng hồ",
        price: 8000000,
        discount: 8,
        avgRating: 4.4,
        colors: ["Đen", "Bạc", "Xanh"],
        options: ["Bluetooth", "4G"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/sansung_2__2.png", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-r925_003_l_perspective_gray_titanium.png"],
        description: "Đồng hồ thông minh Samsung Galaxy"
    },
    {
        id: 7,
        name: "iPad Air 5",
        category: "Máy tính bảng",
        price: 15000000,
        discount: 7,
        avgRating: 4.6,
        colors: ["Xanh", "Hồng", "Bạc"],
        options: ["64GB", "256GB"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/7/_/7_87_6.jpg", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/3/_/3_226_1.jpg"],
        description: "Máy tính bảng iPad Air 5 chip M1 bản 512Gb"
    },
    {
        id: 8,
        name: "Xiaomi Redmi Note 12",
        category: "Điện thoại",
        price: 7000000,
        discount: 10,
        avgRating: 4.2,
        colors: ["Đen", "Xanh", "Trắng"],
        options: ["128GB", "256GB"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/t/gtt_7766_3__1_4_2.jpg", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/_/7/_76666_7__2_1.jpg"],
        description: "Điện thoại Xiaomi Redmi Note 12 giá rẻ"
    },
    {
        id: 9,
        name: "ASUS ROG Strix G15",
        category: "Laptop",
        price: 32000000,
        discount: 12,
        avgRating: 4.7,
        colors: ["Đen", "Xám"],
        options: ["512GB SSD", "1TB SSD"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/2/_/2_64_37.jpg", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/6/_/6_22_24.jpg"],
        description: "Laptop gaming ASUS ROG Strix G15"
    },
    {
        id: 10,
        name: "Apple AirPods Pro 2",
        category: "Phụ kiện",
        price: 6000000,
        discount: 5,
        avgRating: 4.6,
        colors: ["Trắng"],
        options: [],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-pro-2-usb-c_8_.png", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-airpods-pro-2-usb-c_7_.png"],
        description: "Tai nghe không dây Apple AirPods Pro 2"
    },
    {
        id: 11,
        name: "Sony WH-1000XM5",
        category: "Phụ kiện",
        price: 8000000,
        discount: 10,
        avgRating: 4.8,
        colors: ["Đen", "Bạc"],
        options: [],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-chup-tai-sony-wh-1000xm5-2-removebg-preview.png", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-chup-tai-sony-wh-1000xm5-3.png"],
        description: "Tai nghe chống ồn Sony WH-1000XM5"
    },
    {
        id: 12,
        name: "Garmin Forerunner 945",
        category: "Đồng hồ",
        price: 12000000,
        discount: 10,
        avgRating: 4.5,
        colors: ["Đen", "Xanh"],
        options: ["Bluetooth", "GPS"],
        images: ["https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/9/4/945_1_2_1.jpg", "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_2019-06-04_13-50-58_4_1_1.png"],
        description: "Đồng hồ thể thao Garmin Forerunner 945"
    },
    {
        id: 17,
        name: "iPhone 16 Pro Max",
        category: "Điện thoại",
        price: 21990000,
        oldPrice: 23990000,
        avgRating: 4.7,
        colors: ["Đen", "Trắng", "Vàng Gold", "Bạc"],
        options: ["128GB", "256GB", "512GB"],
        description: "iPhone 16 Pro Max với màn hình 6.1 inch Super Retina XDR.",
        images: [
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:300:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-titan-tu-nhien_2.png",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:300:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-titan-trang_2.png",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:300:0/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max-titan-sa-mac_2.png"
        ]
    },
    {
        id: 18,
        name: "iPhone 13 Pro Max",
        category: "Điện thoại",
        price: 25990000,
        oldPrice: 27990000,
        avgRating: 4.8,
        colors: ["Đen", "Trắng", "Xanh", "Bạc"],
        options: ["128GB", "256GB", "512GB"],
        description: "iPhone 13 Pro Max với màn hình 6.7 inch ProMotion.",
        images: [
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/3/_/3_51_1_2_2_1_1_2.jpg",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/_/1_66_6_2_1_1_1_2.jpg",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/2/_/2_61_8_2_1_1_1_2.jpg"
        ]
    },
    {
        id: 13,
        name: "Samsung Galaxy S22 Ultra",
        category: "Điện thoại",
        price: 27990000,
        oldPrice: 29990000,
        avgRating: 4.7,
        colors: ["Đen", "Trắng", "Vàng Gold", "Bạc"],
        options: ["256GB", "512GB"],
        description: "Samsung Galaxy S22 Ultra với màn hình AMOLED 6.8 inch.",
        images: [
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s22-ultra_1.png",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_green_211119.jpg",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomblack_211119.jpg"
        ]
    },
    {
        id: 14,
        name: "Xiaomi 12 Pro",
        category: "Điện thoại",
        price: 18990000,
        oldPrice: 20990000,
        avgRating: 4.6,
        colors: ["Đen", "Trắng"],
        options: ["128GB", "256GB"],
        description: "Xiaomi 12 Pro với Snapdragon 8 Gen 1, sạc nhanh 120W",
        images: [
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi-12-pro_arenamobiles_4_2_1.jpg",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_2__3_2_1_1_1.png",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/_/t_i_xu_ng_1__3_11_1_1_1.png"
        ]
    },
    {
        id: 15,
        name: "Xiaomi Redmi Note 11 Pro",
        category: "Điện thoại",
        price: 8990000,
        oldPrice: 9990000,
        avgRating: 4.5,
        colors: ["Đen", "Trắng", "Bạc"],
        options: ["128GB", "256GB"],
        description: "Xiaomi Redmi Note 11 Pro với pin 5000mAh",
        images: [
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/1/11-pro-plus-blue_2_1_1.jpg",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/1/11-pro-plus-black-1_2_1_1.jpg",
            "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/1/1/11-pro-plus-green-1_2_1_2.jpg"
        ]
    }

];
