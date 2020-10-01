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
        $(".dialog-modal, #btn-cancel, .dialog-title-cancel").click(() => this.onHideDialog());
        $("#btn-save").click(() => this.onSave());
        $("#btn-delete").click(() => this.onDeleteRowSelected());
        $("#table-data tbody").on('click', 'tr', this.onChangeTrSelected);
        this.initValidate();
    }

    /**
     * Hàm khởi tạo validate form-data
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    initValidate() {}

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
                $('.grid tbody').append(this.makeTrHtml(item));
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
     * Hàm binding data từ đối tượng sang tr
     * @param {object} item
     * @returns {InnerHTML} trHtml
     * Author: LTQuan (27/09/2020)
     * */
    makeTrHtml(item) {
        // Lấy ra fieldName và format cho từng field
        let fields = $(".grid thead tr:first th").toArray().map(item => {
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
                    trHtml.append(`<td title='${item[field.fieldName]}'>${item[field.fieldName].formatAddress()}</td>`);
                    break;
                default:
                    trHtml.append(`<td title='${item[field.fieldName]||""}'>${item[field.fieldName]||""}</td>`);
                    break;
            }
        });
        return trHtml;
    }

    //#endregion LOAD DATA

    /**
     * Hàm lấy id của obj
     * @returns {string} id
     * Author: LTQuan (25/09/2020)
     * */
    getId() {
        return $(".row-selected td")[0].innerText;
    }

    /**
     * Hàm xóa row selected
     * @returns {void}
     * Author: LTQuan (27/09/2020)
     * */
    onDeleteRowSelected() {
        if (!$('.row-selected').length) {
            alert(this.message.DELETE_NONE);
        } else {
            this.method = 'DELETE';
            $.ajax({
                url: `${this.url}/${this.getId()}`,
                method: this.method,
                dataType: 'text'
            }).done(res => {
                this.fetchData();
                let messageStatus;
                if (res) {
                   messageStatus = this.message.DELETE_SUCCESS;
                } else {
                    messageStatus = this.message.NOT_EXISTS;
                }
                alert(messageStatus)
            }).fail(err => {
                console.log(err);
                alert(message.ERROR);
            });
        }
    }

    /**
     * Hàm thực hiện thêm/sửa obj
     * @returns {void}
     * Author: LTQuan (27/09/2020)
     * */
    onSave() {
        if ($('#form-data').valid()) {
            let obj = $("#form-data").serializeArray().reduce((result, item) => {
                let format = $(`#form-data input[name='${item.name}']`).attr("format");
                return { ...result, [item.name]: commonJS.formatValue(item.value, format)};
            }, {});
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
                alert(messageStatus);
            }).fail(err => {
                console.log(err);
                alert(message.ERROR);
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
            alert(this.message.EDIT_NONE);
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
            catch (e) {}
        });
    }

    //#region SHOW/HIDE Dialog

    /**
     * Hàm show dialog
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    onShowDialog() {
        $(".dialog-modal, .dialog").show();
        $("#form-data input:first").focus();
    }

    /**
     * Hàm ẩn dialog và refresh value của các input
     * @returns {void}
     * Author: LTQuan (28/09/2020)
     * */
    onHideDialog() {
        $(".dialog-modal, .dialog").hide();
        $("#form-data input[type='text'], #form-data input[type='date'], #form-data textarea").val('').removeClass('error').removeAttr('title');
        $("#txtDateOfBrith").val(null);
        $("#form-data input[type='radio']:last").prop('checked', true);
    }

    //#endregion SHOW/HIDE Dialog
}