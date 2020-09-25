$(document).ready(function () {
    const employee = new EmployeeJS();
});
class EmployeeJS {
    constructor() {
        this.url = '/api/CustomerAPI';
        this.method = 'GET';
        this.initEvents();
        this.loadData();
    }
    initEvents() {
        $("#btn-add").click(this.onShowDialog.bind(this));
        $("#btn-edit").click(this.onEditCustomer.bind(this));
        $(".dialog-modal, #btn-cancel, .dialog-title-cancel").click(this.onHideDialog.bind(this));
        $("#btn-save").click(this.onSaveCustomer.bind(this));
        $("#btn-delete").click(this.onDeleteCustomer.bind(this));
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
    /**
     * Hàm format Date
     * @param {string} date
     * Author: LTQuan
     */
    formatDate(date) {
        return date.split("T")[0].split("-").reverse().join("/");
    }
    /**
     * Hàm format Address
     * @param {string} address
     * Author: LTQuan
     */
    formatAddress(address) {
        return address.length > 26 ? `${address.substr(0, 26)}...` : address;
    }
    makeTrHtml(item) {
        return $(`<tr onclick='EmployeeJS.onChangeTrSelected(this)'>
                    <td title='${item.customerCode}'>${item.customerCode}</td>
                    <td title='${item.customerName}'>${item.customerName || ""}</td>
                    <td style="text-align:center;" title='${item.gender}'>${item.gender}</td>
                    <td title='${this.formatDate(item.dateOfBrith)}'>${this.formatDate(item.dateOfBrith)}</td>
                    <td title='${item.address}'>${this.formatAddress(item.address)}</td>
                    <td title='${item.sdt}'>${item.sdt}</td>
                    <td title='${item.email}'>${item.email}</td>
                    <td style='text-align: end;' title='${item.debtMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}  VND'>
                        ${item.debtMoney.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} VND
                    </td>
                </tr>`);
    }
    static onChangeTrSelected(element) {
        if ($(element).hasClass('row-selected')) {
            $(element).removeClass('row-selected');
        } else {
            $("tr").removeClass('row-selected');
            $(element).addClass('row-selected');
        }
    }
    /**
     * Ham make row cho table
     * @param {any} item doi tuong customer
     * Author: LTQuan (24/9/2020)
     * Edit: ...
     */
    loadData() {
        $(".grid tbody").empty();
        this.method = 'GET';
        let context = this;
        $.ajax({
            url: context.url,
            method: context.method,
            dataType: 'json'
        }).done(res => {
            $.each(res, (i, item) => {
                $(".grid tbody").append(context.makeTrHtml(item));
            });
        }).fail(err => {
            console.log(err);
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
    onSaveCustomer() {
        this.method = 'POST';
        //let context = this;
        if ($('#form-data').valid()) {
            let employee = {};
            $("#form-data").serializeArray().forEach(item => {
                if (item.name == "DebtMoney") {
                    employee[item.name] = parseFloat(item.value);
                } else {
                    employee[item.name] = item.value;
                }
            });
            $.ajax({
                url: this.url,
                method: this.method,
                data: JSON.stringify(employee),
                contentType: 'application/json',
                dataType: 'json'
            }).done(res => {
                this.loadData();
                this.onHideDialog();
            }).fail(err => {
                console.log(err);
            })
        }
    }
    onDeleteCustomer() {
        if (!$('.row-selected').length) {
            alert("Vui lòng chọn khách hàng để xóa khỏi hệ thống!")
        } else {
            this.method = 'DELETE';
            $.ajax({
                url: `${this.url}/${this.getId()}`,
                method: this.method,
                dataType: 'text'
            }).done(res => {
                debugger;
                this.loadData();
            }).fail(err => {
                console.log(err);
            });
        }
    }
    getId() {
        return $(".row-selected td")[0].innerText;
    }
    onShowDialog() {
        $(".dialog-modal, .dialog").show();
    }
    onHideDialog() {
        $(".dialog-modal, .dialog").hide();
        $("#form-data input, textarea").val('').removeClass('error').removeAttr('title');
    }
    setInputDialog(cells) {
        $("#txtCustomerCode").val(cells.customerCode);
        $("#txtCustomerName").val(cells.customerName);
        //$("#txtGender").val(cells[2]);
        $("#txtDateOfBrith").val(cells.dateOfBrith.split("T")[0]);
        $("#txtAddress").val(cells.address);
        $("#txtSDT").val(cells.sdt);
        $("#txtEmail").val(cells.email);
        $("#txtDebtMoney").val(cells.debtMoney);
    }
}