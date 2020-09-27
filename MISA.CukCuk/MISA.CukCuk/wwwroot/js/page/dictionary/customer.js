$(document).ready(function () {
    const employee = new EmployeeJS();
});
class EmployeeJS extends BaseJS {
    constructor() {
        super(api.CUSTOMER_API);
    }
    initEvents() {
        $("#btn-add").click(this.onShowDialog.bind(this));
        $("#btn-edit").click(this.onEditCustomer.bind(this));
        $(".dialog-modal, #btn-cancel, .dialog-title-cancel").click(this.onHideDialog.bind(this));
        $("#btn-save").click(this.onSave.bind(this));
        $("#btn-delete").click(this.onDeleteRowSelected.bind(this));
        $("#table-data tbody").on('click', 'tr', this.onChangeTrSelected);
        $("#form-data").validate({
            onfocusout: function (element) {
                $(element).valid();
            },
            rules: {
                CustomerCode: 'required',
                CustomerName: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                CustomerCode: 'mã khách hàng không được để trống',
                CustomerName: {
                    required: 'tên khách hàng không được để trống',
                    minlength: 'tên khách hàng quá ngắn'
                }
            },
            errorPlacement: function (error, element) {
                element.attr('title', error.text());
            },
            success: function (element) {
                $(element).removeAttr('title');
            }
        });
    }
    onEditCustomer() {
        this.method = 'GET';
        if (!$('.row-selected').length) {
            alert("Vui lòng chọn khách hàng để sửa!");
        } else {
            let id = this.getId();
            $.ajax({
                url: `${this.url}/${id}`,
                method: this.method,
                dataType: 'json'
            }).done(res => {
                this.setInputDialog(res);
            }).fail(err => {
                console.log(err);
            });
            this.onShowDialog();
        }
    }
    
    onShowDialog() {
        $(".dialog-modal, .dialog").show();
    }
    onHideDialog() {
        $(".dialog-modal, .dialog").hide();
        $("#form-data input[type='text'], textarea").val('').removeClass('error').removeAttr('title');
        $("#txtDateOfBrith").val(null);
        $("#form-data input[value='1']").prop('checked', true);
    }
    setInputDialog(customer) {
        $("#txtCustomerCode").val(customer.customerCode);
        $("#txtCustomerName").val(customer.customerName);
        $(`#form-data input[value=${customer.gender}]`).prop('checked', true);
        $("#txtDateOfBrith").val(customer.dateOfBrith.split("T")[0]);
        $("#txtAddress").val(customer.address);
        $("#txtSDT").val(customer.sdt);
        $("#txtEmail").val(customer.email);
        $("#txtDebtMoney").val(customer.debtMoney);
    }
}