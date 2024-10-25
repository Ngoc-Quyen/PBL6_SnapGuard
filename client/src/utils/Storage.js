// utils/storage.js
export const setItemWithExpiry = (key, value, expiryInHours = 24) => {
    const now = new Date();
    const expiryTime = now.getTime() + expiryInHours * 60 * 60 * 1000; // Tính thời gian hết hạn
    const item = {
        value: value,
        expiry: expiryTime, // Thêm thời gian hết hạn vào đối tượng
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    // Nếu không có dữ liệu, trả về null
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();

    // Kiểm tra xem dữ liệu đã hết hạn hay chưa
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key); // Xóa dữ liệu nếu đã hết hạn
        return null;
    }
    return item.value; // Trả về giá trị nếu chưa hết hạn
};
