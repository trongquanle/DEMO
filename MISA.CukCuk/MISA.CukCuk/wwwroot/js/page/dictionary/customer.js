$(document).ready(function () {
    const customerJS = new CustomerJS();
});

class CustomerJS extends BaseJS {
    constructor() {
        super(api.CUSTOMER_API, message.customer);
    }

    //#region Validate sử dụng lib validation

    /**
     * Hàm validate form-data customer
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    initValidate() {
        $("#form-data").validate({
            onfocusout: function (element) {
                if (element.tagName === "TEXTAREA" || (element.tagName === "INPUT" && element.type !== "password")) {
                    element.value = $.trim(element.value);
                }
                return $(element).valid();
            },
            rules: {
                customerCode: 'required',
                customerName: {
                    required: true,
                    minlength: 6
                },
                debtMoney: {
                    number: true
                }
            },
            messages: {
                customerCode: 'mã khách hàng không được để trống',
                customerName: {
                    required: 'tên khách hàng không được để trống',
                    minlength: 'tên khách hàng quá ngắn'
                },
                debtMoney: 'số tiền nợ không hợp lệ'
            },
            errorPlacement: function (error, element) {
                element.attr('title', error.text());
            },
            success: function (element) {
                $(element).removeAttr('title');
            }
        });
    }

    //#endregion
}