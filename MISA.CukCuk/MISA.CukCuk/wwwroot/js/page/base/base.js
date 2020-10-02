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
        //$("input[required]").blur(validate.initRequired);
        this.initValidate();
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
     * @returns {void}
     * Author: LTQuan (28/09/2020)
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

    //#endregion LOAD DATA

    /**
     * Hàm lấy id của obj
     * @returns {string} id
     * Author: LTQuan (25/09/2020)
     * */
    getId() {
        return $(".grid table#table-data .row-selected td")[0].innerText;
    }

    /**
     * Hàm check row selected
     * @returns {void}
     * Author: LTQuan (27/09/2020)
     * */
    onCheckSelectedRow() {
        if (!$('.row-selected').length) {
            this.onShowDialogMessage(this.message.DELETE_NONE, iconType.ICON_WARNING);
        } else {
            this.method = 'DELETE';
            this.onShowDialogMessage(this.message.COMFIRM_DELETE, iconType.ICON_WARNING, true);
        }
    }

    /**
     * Hàm xóa row selected
     * Author: LTQuan (02/10/2020)
     * */
    onDeleteRow() {
        $.ajax({
            url: `${this.url}/${this.getId()}`,
            method: this.method,
            dataType: 'text'
        }).done(res => {
            this.fetchData();
            let messageStatus;
            let type;
            if (res) {
                messageStatus = this.message.DELETE_SUCCESS;
                type = iconType.ICON_SUCCESS;
            } else {
                messageStatus = this.message.NOT_EXISTS;
                type = iconType.ICON_WARNING;
            }
            this.onShowDialogMessage(messageStatus, type);
        }).fail(err => {
            console.log(err);
            this.onShowDialogMessage(message.ERROR, iconType.ICON_WARNING);
        });
    }

    /**
     * Hàm thực hiện thêm/sửa obj
     * @returns {void}
     * Author: LTQuan (27/09/2020)
     * */
    onSave() {
        if ($("#form-data").valid()) {
            // Sử dụng reduce để chuyển đổi array sinh ra từ hàm serializeArray thành object
            let obj = $("#form-data").serializeArray().reduce((result, item) => {
                let format = $(`#form-data input[name='${item.name}']`).attr("format");
                // Return các properties trong current value và nạp thuộc tính mới
                return { ...result, [item.name]: commonJS.formatValue(item.value, format) };
            }, {}); // Giá trị khởi tạo của result
            $.ajax({
                url: this.url,
                method: this.method,
                data: JSON.stringify(obj),
                contentType: 'application/json',
                dataType: 'json'
            }).done(res => {
                let messageStatus;
                let type;
                if (res) {
                    if (this.method == 'POST') {
                        messageStatus = this.message.ADD_SUCCESS;
                        type = iconType.ICON_SUCCESS;
                    } else {
                        messageStatus = this.message.EDIT_SUCCESS;
                        type = iconType.ICON_SUCCESS;
                    }
                } else {
                    messageStatus = this.message.NOT_EXISTS;
                    type = iconType.ICON_WARNING;
                }
                this.fetchData();
                this.onHideDialog();
                this.onShowDialogMessage(messageStatus, type);
            }).fail(err => {
                console.log(err);
                this.onShowDialogMessage(message.ERROR,iconType.ICON_WARNING);
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
            this.onShowDialogMessage(this.message.EDIT_NONE, iconType.ICON_WARNING);
        } else {
            $.ajax({
                url: `${this.url}/${this.getId()}`,
                method: this.method,
                dataType: 'json'
            }).done(res => {
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
        $("#form-data").serializeArray().forEach(item => {
            // Lấy ra thẻ input với name tương ứng
            let element = $(`#form-data input[name='${item.name}']`);
            // Kiểm tra kiểu của các thẻ input để binding dữ liệu phù hợp
            let type = element.attr('type');
            try {
                // Gán giá trị cho thẻ input
                switch (type) {
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
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    onShowDialog() {
        $(".dialog-modal, .dialog-detail").show();
        $("#form-data input:first").focus();
    }

    /**
     * Hàm show dialog message, icon: kiểu thông báo
     * @param {string} message
     * @param {string} icon: loại thông báo
     * @param {boolean} isComfirm: check các trạng thái thông báo/comfirm
     * Author: LTQuan (02/10/2020)
     */
    onShowDialogMessage(message, icon, isComfirm = false) {
        // Set kiểu icon cảnh báo
        $("#message-icon").removeClass().addClass(icon);
        // Check để ẩn/hiện btn-accept, btn-cancel, btn-close
        if (!isComfirm) {
            $("#btn-accept, .dialog-message .btn-cancel").hide();
            $(".btn-close").show();
            setTimeout(() => this.onHideDialogMessage(), 2000);
        } else {
            $(".btn-close").hide();
            $("#btn-accept, .dialog-message, .dialog-message .btn-cancel").show();
        }
        $(".dialog-message #mesage-text").text(message);
        $(".dialog-modal, .dialog-message").show();
    }

    /**
     * Hàm ẩn dialog và refresh value của các input
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    onHideDialog() {
        $(".dialog-modal, .dialog-detail, .dialog-message").hide();
        $("#form-data input[type='text'], #form-data input[type='date'], #form-data textarea").val('').removeClass('error').removeAttr('title');
        $("#txtDateOfBrith").val(null);
        $("#form-data input[type='radio']:last").prop('checked', true);
    }

    /**
     * Hàm hide dialog message
     * Author: LTQuan (02/10/2020)
     * */
    onHideDialogMessage() {
        $(".dialog-modal, .dialog-message").hide();
    }

    //#endregion SHOW/HIDE Dialog
}