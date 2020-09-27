const commonJS = {
    /**
     * Hàm format tiền tệ VND
     * @param {number} money
     * Author: LTQuan
     * */
    formatMonney : (money) => {
        return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    },
    /**
     * Hàm format Date
     * @param {string} date
     * Author: LTQuan
     */
    formatDate: (date) => {
        return date.split("T")[0].split("-").reverse().join("/");
    },
    /**
     * Hàm format Address
     * @param {string} address
     * Author: LTQuan
     */
    formatAddress: (address) => {
        return address.length > 26 ? `${address.substr(0, 26)}...` : address;
    }
}
/**
 * Hàm format địa chỉ nếu quá dài so với mỗi tr
 * Author: LTQuan (25/09/2020)
 * */
String.prototype.formatAddress = function () {
    return this.length > 26 ? `${this.substr(0, 26)}...` : this;
}

/**
 * Hàm format ngày tháng về dạng DD-MM-YYYY
 * Author: LTQuan (25/09/2020)
 * */
String.prototype.formatDate = function () {
    return this.split("T")[0].split("-").reverse().join("/");
}
/**
 * Hàm format giá tiền
 * Author: LTQuan (25/09/2020)
 * */
Number.prototype.formatMoney = function () {
    return `${this.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND`;
}
Number.prototype.setGender = function () {
    return this == 1 ? "Nam" : (this == 0 ? "Nữ" : "");
}

/**
 * Constaint url
 * Author: LTQuan (26/09/2020)
 * */
const api = {
    CUSTOMER_API: '/api/CustomerAPI'
}

/**
 * Constaint format field
 * */
const formatField = {
    NUMBER: 'number',
    DATE: 'date',
    STRING: 'string',
    LIMIT_STRING: 'limit_string',
    GENDER: 'gender'
}