﻿$(document).ready(function () {
    const employee = new EmployeeJS();
});
class EmployeeJS extends BaseJS {
    constructor() {
        super(api.EMPLOYEE_API, message.employee);
    }

    //#region Validate sử dụng lib validation

    /**
     * Khởi tạo validate employee
     * Author: LTQuan (01/10/2020)
     * */
    initValidate() {
        // Custom rule email valid
        $.validator.addMethod("validEmail", function (value, element) {
            return this.optional(element) || /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        }, 'Please enter a valid email address.');
        $("#form-data").validate({
            onfocusout: function (element) {
                if (element.tagName === "TEXTAREA" || (element.tagName === "INPUT" && element.type !== "password")) {
                    element.value = $.trim(element.value);
                }
                return $(element).valid();
            },
            rules: {
                employeeCode: 'required',
                employeeName: {
                    required: true,
                    minlength: 6
                },
                //dateOfBrith: 'required',
                salary: {
                    //required: true,
                    number: true
                },
                email: {
                    required: true,
                    validEmail: true
                }
            },
            messages: {
                employeeCode: 'mã nhân viên không được để trống',
                employeeName: {
                    required: 'tên nhân viên không được để trống',
                    minlength: 'tên nhân viên quá ngắn'
                },
                //dateOfBrith: 'ngày sinh không được bỏ trống',
                salary: {
                    //required: 'tiền lương không được để trống',
                    number: 'tiền lương không hợp lệ'
                },
                email: {
                    required: 'email không được bỏ trống',
                    validEmail: 'email không hợp lệ'
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

    //#endregion
}