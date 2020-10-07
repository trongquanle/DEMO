class BaseJS {

    /**
     * Hàm khởi tạo với tham số đầu vào là url và obj message
     * @param {string} url
     * @param {object} message
     * Author: LTQuan (26/09/2020)
     */
    constructor(url, message) {
        this.url = url;
        this.message = message;
        this.fetchData();
        this.initEvents();
    }

    /**
     * Hàm khởi tạo sự kiện cho các control
     * @returns {void}
     * Author: LTQuan (26/09/2020)
     * */
    initEvents() {
        $("#btn-add").click(() => this.onAdd());
        $("#btn-edit").click(() => this.onEdit());
        $(".dialog-modal, .btn-cancel, .dialog-title-cancel, .btn-close").click(() => this.onHideDialog());
        $("#btn-save").click(this.onSave.bind(this));
        $("#btn-delete").click(() => this.onCheckSelectedRow());
        $("#btn-accept").click(() => this.onDeleteRow());
        $("#table-data tbody").on('click', 'tr', this.onChangeTrSelected);
        $("#form-data input[type='checkbox']").click(this.onChangeSelectedCheckbox);
        //$("input[required]").blur(validate.initRequired);
        this.initValidate();
        this.initTabEvents();
    }

    /**
     * Hàm gán sự kiện form dialog
     * Author: LTQUAN (07/10/2020)
     * */
    initTabEvents() {
        $(".dialog-detail .btn-cancel").on('keydown', function (e) {
            var code = e.keyCode || e.which;
            if (event.shiftKey && code == 9) {
                $(this).focus();
            } else if (code === 9) {
                $(".left-paging ul li select").focus();
            }
        });
        $("#form-data input:first").on('keydown', function (e) {
            var code = e.keyCode || e.which;
            if (event.shiftKey && code == 9) {
                $('.dialog button:first').focus();
            }
        });
        $("#form-data input[type='checkbox']").keypress(function (e) {
            if ((e.keyCode ? e.keyCode : e.which) == 13) {
                $(this).trigger('click');
            }
        });
    }

    /// TODO: vali....
    //validateData() {
    //    let inputRequireds = $("input[required]");
    //    let isValid = true;
    //    // Kiểm tra rỗng
    //    $.each(inputRequireds, function (i, input) {
    //        if (!validate.checkRequired(input)) {
    //            isValid = false;
    //        }
    //    });
    //    // Kiểm tra nâng cao
    //    if (isValid) {
    //        // Validate email
    //        let emailInput = $("input[format='email']");
    //        if (emailInput && !validate.isEmail(emailInput.val())) {
    //            isValid = false;
    //            emailInput.addClass('error').attr('title', 'email không hợp lệ');
    //        } else {
    //            emailInput.removeClass('error').removeAttr('title');
    //        }

    //        // Validate money
    //        let moneyInput = $("input[format='number']");
    //        debugger
    //        if (moneyInput.val() || (moneyInput && !validate.isNumber(moneyInput.val()))) {
    //            isValid = false;
    //            moneyInput.addClass('error').attr('title', 'số tiền không hợp lệ');
    //        } else {
    //            moneyInput.removeClass('error').removeAttr('title');
    //        }
    //    }
    //    return false;
    //}

    /**
     * Hàm khởi tạo validate form-data
     * Author: LTQuan (28/09/2020)
     * @returns {void}
     * */
    initValidate() { }

    //#region LOAD DATA

    /**
     * Hàm fetch data từ server
     * @returns {void}
     * Author: LTQuan (26/09/2020)
     * */
    fetchData() {
        this.method = 'GET';
        $.ajax({
            url: this.url,
            method: this.method,
            dataType: 'json'
        }).done(res => {
            this.loadData(res);
        }).fail(err => {
            console.log(err);
        });
    }

    /**
     * Hàm nạp data khi fetch về từ server
     * Author: LTQuan (26/09/2020)
     * @param {any} data
     */
    loadData(data) {
        $(".grid tbody").empty();
        data.forEach((item) => {
            try {
                $('.grid tbody').append(commonJS.makeTrHtml(item));
            } catch (e) {
                console.log(e);
            }
        });
    }

    /**
     * Hàm chọn row khi click
     * @returns {void}
     * Author: LTQuan (26/09/2020)
     */
    onChangeTrSelected() {
        if ($(this).hasClass('row-selected')) {
            $(this).removeClass('row-selected');
        } else {
            $(this).siblings().removeClass('row-selected');
            $(this).addClass('row-selected');
        }
    }

    /**
     * Hàm bắt sự kiện thay đổi của checkbox
     * Author: LTQUAN (05/10/2020)
     * */
    onChangeSelectedCheckbox() {
        $(this).prop('checked', true).siblings("input[type='checkbox']").prop('checked', false);
    }

    //#endregion LOAD DATA

    /**
     * Hàm check row selected
     * Author: LTQuan (27/09/2020)
     * @returns {void}
     * */
    onCheckSelectedRow() {
        if (!$('.row-selected').length) {
            notification.warning(this.message.DELETE_NONE);
        } else {
            this.method = 'DELETE';
            this.onShowDialogComfirm(this.message.COMFIRM_DELETE);
        }
    }

    /**
     * Hàm xóa row selected
     * Author: LTQuan (02/10/2020)
     * */
    onDeleteRow() {
        this.onHideDialogComfirm();
        $.ajax({
            url: `${this.url}/${commonJS.getId()}`,
            method: this.method,
            dataType: 'text'
        }).done(res => {
            this.fetchData();
            if (res) {
                notification.success(this.message.DELETE_SUCCESS);
            } else {
                notification.infor(this.message.NOT_EXISTS);
            }
        }).fail(err => {
            console.log(err);
            notification.danger(message.ERROR);
        });
    }

    /**
     * Hàm thực hiện thêm/sửa obj
     * Author: LTQuan (27/09/2020)
     * @returns {void}
     * */
    onSave() {
        if ($("#form-data").valid()) {
            // Sử dụng reduce để chuyển đổi array sinh ra từ hàm serializeArray thành object
            let obj = $("#form-data").serializeArray().reduce((result, item) => {
                /// TODO: ,,,
                let format = $(`#form-data input[name='${item.name}']`).attr("format");
                // Return các properties trong current value và nạp thuộc tính mới
                return { ...result, [item.name]: commonJS.formatValue(item.value, format) };
            }, { [commonJS.getKeyId()]: commonJS.getId() }); // Giá trị khởi tạo của result
            // Thực hiện gọi req đến server
            $.ajax({
                url: this.url,
                method: this.method,
                data: JSON.stringify(obj),
                contentType: 'application/json',
                dataType: 'json'
            }).done(res => {
                let messageStatus;
                if (res) {
                    if (this.method == 'POST') {
                        messageStatus = this.message.ADD_SUCCESS;
                    } else {
                        messageStatus = this.message.EDIT_SUCCESS;
                    }
                } else {
                    messageStatus = this.message.NOT_EXISTS;
                }
                this.fetchData();
                this.onHideDialog();
                notification.success(messageStatus);
            }).fail(err => {
                console.log(err);
                notification.danger(message.ERROR);
            })
        }
    }

    /**
     * Hàm mở form dialog thêm mới obj
     * @returns {void}
     * Author: LTQuan (27/09/2020)
     * */
    onAdd() {
        this.method = 'POST';
        this.onShowDialog();
    }

    /**
     * Hàm fetch obj từ server theo row-selected
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    onEdit() {
        this.method = 'GET';
        if (!$('.row-selected').length) {
            notification.warning(this.message.EDIT_NONE);
        } else {
            $.ajax({
                url: `${this.url}/${commonJS.getId()}`,
                method: this.method,
                dataType: 'json'
            }).done(res => {
                console.log(res);
                this.setInputDialog(res);
                this.onShowDialog();
                this.method = 'PUT';
            }).fail(err => {
                console.log(err);
            });
        }
    }

    /**
     * Hàm set input dialog với obj được fetch về từ server
     * @param {object} obj
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    setInputDialog(obj) {
        // Lấy ra name của các thẻ input trong form
        // Name của các thẻ input phải giống với các field của object
        let x = $("#form-data").serializeArray();
        x.forEach(item => {
            // Lấy ra thẻ input với name tương ứng
            let element = $(`#form-data input[name='${item.name}']`);
            // Kiểm tra kiểu của các thẻ input để binding dữ liệu phù hợp
            let type = element.attr('type');
            try {
                // Gán giá trị cho thẻ input
                switch (type) {
                    case typeInput.CHECKBOX:
                        $(`#form-data input[value='${obj.gender}']`).prop('checked', true).siblings(`input[type='${typeInput.CHECKBOX}']`).prop('checked', false);
                        break;
                    case typeInput.RADIO:
                        $(`#form-data input[value='${obj.gender}']`).prop('checked', true);
                        break;
                    case typeInput.DATE:
                        element.val(obj.dateOfBrith.split('T')[0]);
                        break;
                    default:
                        element.val(obj[element.attr('name')]);
                        break;
                }
            }
            catch (e) { }
        });
    }

    //#region SHOW/HIDE Dialog

    /**
     * Hàm show dialog
     * Author: LTQuan (28/09/2020)
     * */
    onShowDialog() {
        $(".dialog-modal, .dialog-detail").fadeIn(400);
        $("#form-data input:first").focus();
    }

    /**
     * Hàm show dialog message, icon: kiểu thông báo
     * @param {string} message
     * Author: LTQuan (02/10/2020)
     */
    onShowDialogComfirm(message) {
        $(".dialog-message #mesage-text").text(message);
        $(".dialog-modal, .dialog-message").fadeIn(400);
    }

    /**
     * Hàm ẩn dialog và refresh value của các input
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    onHideDialog() {
        $(".dialog-modal, .dialog-detail, .dialog-message").fadeOut(400);
        setTimeout(() => {
            $("#form-data input[type='text'], #form-data input[type='date'], #form-data textarea").val('').removeClass('error').removeAttr('title');
            $("#txtDateOfBrith").val(null);
            $("#form-data input[type='checkbox']").prop('checked', false);
            $("#form-data input[type='checkbox'][checked]").prop('checked', true);
        }, 400);
    }

    /**
     * Hàm hide dialog message
     * Author: LTQuan (02/10/2020)
     * */
    onHideDialogComfirm() {
        $(".dialog-modal, .dialog-message").fadeOut(400);
    }

    //#endregion SHOW/HIDE Dialog
}