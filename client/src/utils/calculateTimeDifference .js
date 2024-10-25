export const calculateTimeDifference = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diff = now - createdDate; // chênh lệch thời gian (ms)

    // Chuyển đổi ms thành các đơn vị thời gian
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) {
        return `${seconds} giây trước`;
    } else if (minutes < 60) {
        return `${minutes} phút trước`;
    } else if (hours < 24) {
        return `${hours} giờ trước`;
    } else if (days < 7) {
        return `${days} ngày trước`;
    } else {
        return `${weeks} tuần trước`;
    }
};
