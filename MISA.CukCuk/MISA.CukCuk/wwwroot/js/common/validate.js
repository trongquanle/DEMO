const validate = {
    /**
     * Hàm khởi tạo check required
     * @param {object} selector
     * Author: LTQuan (01/10/2020)
     * */
    initRequired() {
        validate.checkRequired(this);
    },

    /**
     * Hàm check xem giá có nhập giá trị hay không
     * @param {object} selector
     * Author: LTQuan (01/10/2020)
     * */
    checkRequired: (selector) => {
        $(selector).val($(selector).val().trim());
        let value = $(selector).val();
        if (!value) {
            $(selector).addClass('error').attr('title', 'trường này không được phép để trống');
            return false;
        }
        $(selector).removeClass('error').removeAttr('title');
        return true;
    },

    /**
     * Hàm kiểm tra có phải là kiểu số hay không
     * @param {number} number
     * Author: LTQuan (01/10/2020)
     **/
    isNumber: (number) => {
        return /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/.test(number);
    },

    /**
     * Hàm check required
     * @param {any} value
     * Author: LTQuan (01/10/2020)
     **/
    required: (value) => {
        return !value ? false : true;
    },

    /**
     * Hàm check email
     * @param {string} email
     * Author: LTQuan (01/10/2020)
     **/
    isEmail: (email) => {
        return /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/.test(email);
    }
}