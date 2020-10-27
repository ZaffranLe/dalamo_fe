export const randomNumber = (min, max) => {
    return min + Math.trunc(Math.random() * (max - min));
};

export const formatCurrency = (value) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const parseCurrency = (value) => {
    return value.replace(/\$\s?|( *)/g, "");
};

export const formatVietnameseCurrency = (money) => {
    return parseInt(money).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

export const calcDiscountPrice = (money, discountPercent) => {
    const intM = parseInt(money);
    const intDP = parseInt(discountPercent);
    return Math.floor(intM - (intM * intDP) / 100);
};

export const getSlug = (str) => {
    str = str.toLowerCase();
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");
    str = str.replace(/([^0-9a-z-\s])/g, "");
    str = str.replace(/- /g, "");
    str = str.replace(/(\s+)/g, "-");
    str = str.replace(/^-+/g, "");
    str = str.replace(/-+$/g, "");
    return str;
};
