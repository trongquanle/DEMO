class BaseJS {
    /**
     * Hàm khởi tạo với tham số đầu vào là url
     * @param {string} url
     * Author: LTQuan (26/09/2020)
     */
    constructor(url) {
        this.url = url;
        this.fetchData();
        this.initEvents();
    }
    initEvents() {

    }

    //#region LOAD DATA
    /**
     * Hàm fetch data từ server
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
    loadData(data) {
        $(".grid tbody").empty();
        let self = this;
        data.forEach((item) => {
            try {
                $('.grid tbody').append(self.makeTrHtml(item));
            } catch (e) {
                console.log(e);
            }
        });
    }
    /**
     * Hàm chọn row khi click
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
        // Duyệt fields để binding data từ item
        fields.forEach(field => {
            switch (field.format) {
                case formatField.NUMBER:
                    trHtml.append(`<td style='text-align: end' title='${item[field.fieldName].formatMoney()}'>${item[field.fieldName].formatMoney()}</td>`);
                    break;
                case formatField.DATE:
                    trHtml.append(`<td style='text-align: center' title='${item[field.fieldName].formatDate()}'>${item[field.fieldName].formatDate()}</td>`);
                    break;
                case formatField.GENDER:
                    trHtml.append(`<td title='${item[field.fieldName].setGender()}'>${item[field.fieldName].setGender()}</td>`);
                    break;
                case formatField.LIMIT_STRING:
                    trHtml.append(`<td title='${item[field.fieldName]}'>${item[field.fieldName].formatAddress()}</td>`);
                    break;
                default:
                    trHtml.append(`<td title='${item[field.fieldName]}'>${item[field.fieldName]}</td>`);
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
     * Author: LTQuan (27/09/2020)
     * */
    onDeleteRowSelected() {
        if (!$('.row-selected').length) {
            alert("Vui lòng chọn khách hàng để xóa khỏi hệ thống!")
        } else {
            this.method = 'DELETE';
            $.ajax({
                url: `${this.url}/${this.getId()}`,
                method: this.method,
                dataType: 'text'
            }).done(res => {
                this.fetchData();
            }).fail(err => {
                console.log(err);
            });
        }
    }

    /**
     * Hàm thêm mới obj
     * Author: LTQuan (27/09/2020)
     * */
    onSave() {
        this.method = 'POST';
        //let context = this;
        if ($('#form-data').valid()) {
            let obj = $("#form-data").serializeArray().reduce((result, item) => {
                if ($(`#form-data input[name='${item.name}']`).attr("format") == formatField.NUMBER) {
                    item.value = parseFloat(item.value);
                }
                return { ...result, [item.name]: item.value };
            }, {});
            $.ajax({
                url: this.url,
                method: this.method,
                data: JSON.stringify(obj),
                contentType: 'application/json',
                dataType: 'json'
            }).done(res => {
                this.fetchData();
                this.onHideDialog();
            }).fail(err => {
                console.log(err);
            })
        }
    }
}