$(document).ready(function () {
    const customerJS = new CustomerJS();
});
class CustomerJS extends BaseJS {
    constructor() {
        super(api.CUSTOMER_API, message.customer);
    }
    /**
     * Hàm validate form-data customer
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    initValidate() {
        $("#form-data").validate({
            onfocusout: function (element) {
                $(element).valid();
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
    
}