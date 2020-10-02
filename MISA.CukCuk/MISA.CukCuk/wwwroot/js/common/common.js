//#region Helper
const commonJS = {
    /**
     * Hàm format tiền tệ VND
     * @param {number} money
     * Author: LTQuan
     * */
    formatMonney: (money) => {
        return !money ? "" : `${money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND`;
    },

    /**
     * Hàm format Date
     * @param {string} date
     * Author: LTQuan
     */
    formatDate: (date) => {
        return !date ? "" : date.split("T")[0].split("-").reverse().join("/");
    },

    /**
     * Hàm format Address
     * @param {string} address
     * Author: LTQuan
     **/
    formatLimitString: (address) => {
        return address.length > 26 ? `${address.substr(0, 26)}...` : address;
    },

    /**
     * Hàm format giá trị từ input 
     * @param {any} value
     * @param {string} type
     * Author: LTQuan (30/09/2020)
     **/
    formatValue: (value, type) => {
        switch (type) {
            case formatField.NUMBER:
                value = !value ? null : parseFloat(value);
                break;
            case formatField.DATE:
                value = !value ? null : value;
                break;
            default:
                break;
        }
        return value;
    },

    /**
     * Hàm set giới tính
     * @param {number} gender
     * Author: LTQuan (01/10/2020)
     **/
    setGender: (gender) => {
        return gender == null ? "" : (gender == 1 ? "Nam" : "Nữ");
    },

    /**
     * Hàm binding data từ đối tượng sang tr
     * @param {object} item
     * @returns {InnerHTML} trHtml
     * Author: LTQuan (27/09/2020)
     **/
    makeTrHtml: (item) => {
        // Lấy ra fieldName và format cho từng field
        let fields = $(".grid table thead tr:first th").toArray().map(item => {
            return {
                fieldName: $(item).attr('fieldname'),
                format: $(item).attr('format') || 'string'
            }
        });
        let trHtml = $(`<tr></tr>`);
        // Duyệt fields để binding value từ item
        fields.forEach(field => {
            switch (field.format) {
                case formatField.NUMBER:
                    trHtml.append(`<td style='text-align: end' title='${commonJS.formatMonney(item[field.fieldName])}'>${commonJS.formatMonney(item[field.fieldName])}</td>`);
                    break;
                case formatField.DATE:
                    trHtml.append(`<td style='text-align: center' title='${commonJS.formatDate(item[field.fieldName])}'>${commonJS.formatDate(item[field.fieldName])}</td>`);
                    break;
                case formatField.GENDER:
                    trHtml.append(`<td title='${commonJS.setGender(item[field.fieldName])}'>${commonJS.setGender(item[field.fieldName])}</td>`);
                    break;
                case formatField.LIMIT_STRING:
                    trHtml.append(`<td title='${item[field.fieldName]}'>${commonJS.formatLimitString(item[field.fieldName])}</td>`);
                    break;
                default:
                    trHtml.append(`<td title='${item[field.fieldName] || ""}'>${item[field.fieldName] || ""}</td>`);
                    break;
            }
        });
        //trHtml.data('id', 'NV1');
        return trHtml;
    }
}

//#endregion Helper

//#region Prototype

/**
 * Hàm format địa chỉ nếu quá dài so với mỗi tr
 * Author: LTQuan (25/09/2020)
 * */
String.prototype.formatAddress = function () {
    return this.length > 26 ? `${this.substr(0, 26)}...` : this;
}

/**
 * Hàm format ngày tháng về dạng DD/MM/YYYY
 * Author: LTQuan (25/09/2020)
 * */
String.prototype.formatDate = function () {
    return this.split("T")[0].split("-").reverse().join("/")||'';
}

/**
 * Hàm format giá tiền
 * Author: LTQuan (25/09/2020)
 * */
Number.prototype.formatMoney = function () {
    return `${this.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND`;
}

/**
 * Hàm format giới tính
 * Author: LTQuan (25/09/2020)
 * */
Number.prototype.setGender = function () {
    return this == 1 ? "Nam" : (this == 0 ? "Nữ" : "");
}


//#endregion Prototype

//#region CONST

/**
 * Constaint url
 * Author: LTQuan (26/09/2020)
 * */
const api = {
    CUSTOMER_API: '/api/CustomerAPI',
    EMPLOYEE_API: '/api/EmployeeAPI'
}

/**
 * Constaint format field
 * Author: LTQuan (27/09/2020)
 * */
const formatField = {
    NUMBER: 'number',
    DATE: 'date',
    STRING: 'string',
    LIMIT_STRING: 'limit_string',
    GENDER: 'gender',
}

/**
 * Constant type input
 * Author: LTQuan (28/09/2020)
 * */
const typeInput = {
    RADIO: 'radio',
    DATE: 'date',
    TEXT: 'text',
    EMAIL: 'email',
    NUMBER: 'number'
}

/**
 * Constant message
 * Author: LTQuan (28/09/2020)
 * */
const message = {
    customer: {
        ADD_SUCCESS: 'Thêm mới khách hàng thành công!',
        EDIT_NONE: 'Vui lòng chọn khách hàng để sửa!',
        EDIT_SUCCESS: 'Cập nhật thành công!',
        DELETE_NONE: 'Vui lòng chọn khách hàng để thực hiện xóa!',
        DELETE_SUCCESS: 'Xóa thành công!',
        NOT_EXISTS: 'Khách hàng này không còn tồn tại trong hệ thống!'
    },
    employee: {
        ADD_SUCCESS: 'Thêm mới nhân viên thành công!',
        EDIT_NONE: 'Vui lòng chọn nhân viên để sửa!',
        EDIT_SUCCESS: 'Cập nhật thành công!',
        COMFIRM_DELETE: 'Bạn có chắc chắn xóa nhân viên này?',
        DELETE_NONE: 'Vui lòng chọn nhân viên để thực hiện xóa!',
        DELETE_SUCCESS: 'Xóa thành công!',
        NOT_EXISTS: 'Nhân viên này không còn tồn tại trong hệ thống!'
    },
    ERROR: 'Có lỗi xảy ra, vui lòng kiểm tra lại!'
}

/**
 * Constant icon type
 * Author: LTQuan (02/10/2020)
 * */
const iconType = {
    ICON_SUCCESS: 'icon-success',
    ICON_WARNING: 'icon-warning'
}

//#endregion CONST