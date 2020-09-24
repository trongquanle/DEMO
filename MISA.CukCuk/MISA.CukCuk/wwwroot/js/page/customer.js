$(document).ready(function () {
    const employee = new EmployeeJS();
});
class EmployeeJS {
    constructor() {
        this.loadData();
        this.initEvents();
    }
    initEvents() {
        $("#btn-add").click(this.onShowDialog.bind(this));
        $("#btn-edit").click(this.onEditCustomer.bind(this));
        $(".dialog-modal, #btn-cancel, .dialog-title-cancel").click(this.onHideDialog.bind(this));
        $("#btn-save").click(this.onSaveCustomer.bind(this));
        $("#btn-delete").click(this.onDeleteCustomer);
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
     * @param {Date} date
     * Author: LTQuan
     */
    formatDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
                    <td title='${this.formatDate(new Date(item.dateOfBrith))}'>${this.formatDate(new Date(item.dateOfBrith))}</td>
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
        let context = this;
        $.ajax({
            url: '/api/CustomerAPI',
            method: 'GET',
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
        if (!$('.row-selected').length) {
            alert("Vui lòng chọn khách hàng để sửa!");
        } else {
            let cells = $('.row-selected').children().toArray().map(item => item.textContent);
            //$.ajax({
            //    url: `/api/CustomerAPI/${cells[0]}`,
            //    method: 'GET',
            //    dataType: 'json'
            //}).done(res => {
            //    console.log(res);
            //}).fail(err => {
            //    console.log(err);
            //});
            this.setInputDialog(cells);
            this.onShowDialog();
        }
    }
    onSaveCustomer() {
        let context = this;
        if ($('#form-data').valid()) {
            let employee = {};
            $("#form-data").serializeArray().forEach(item => {
                employee[item.name] = item.value;
            });
            $.ajax({
                url: '/api/CustomerAPI',
                method: 'POST',
                data: JSON.stringify(employee),
                contentType: 'application/json',
                dataType: 'json'
            }).done(res => {
                $(".grid tbody").append(context.makeTrHtml(res));
                context.onHideDialog();
            }).fail(err => {
                console.log(err);
            })
        }
    }
    onDeleteCustomer() {
        if (!$('.row-selected').length) {
            alert("Vui lòng chọn khách hàng để xóa khỏi hệ thống!")
        } else {
            $.ajax({
                url: `/api/customerAPI/nv001`,
                method: 'DELETE',
                dataType: 'text'
            }).done(res => {
                $('.row-selected').remove();
            }).fail(err => {
                console.log(err);
            });
        }
    }
    onShowDialog() {
        $(".dialog-modal, .dialog").show();
    }
    onHideDialog() {
        $(".dialog-modal, .dialog").hide();
        $("#form-data input, textarea").val('').removeClass('error').removeAttr('title');
    }
    setInputDialog(cells) {
        $("#txtCustomerCode").val(cells[0]);
        $("#txtCustomerName").val(cells[1]);
        $("#txtCompanyName").val(cells[2]);
        $("#txtTaxCode").val(cells[3]);
        $("#txtAddress").val(cells[4]);
        $("#txtSDT").val(cells[5]);
        $("#txtEmail").val(cells[6]);
    }
}