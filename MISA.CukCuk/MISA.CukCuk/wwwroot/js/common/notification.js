const notification = {
    /**
     * Hàm thực hiện show message và init event cho message
     * @param {string} type
     * @param {string} icon
     * @param {string} message
     * @param {number} tiomeOut
    * Author: LTQUAN (06/10/2020)
     * */
    onShowMessage: (type, icon, message, timeOut = 5000) => {
        let x = $(`<div class="notification notification-${type} center-items">
                    <div class="notification-icon">
                        ${icon}
                    </div>
                    <div class="notification-text">${message}</div>
                </div>`);
        $('.notification').animate({
            top: "-=50"
        }, 400);
        $('body').append(x);
        let timer = setTimeout(() => {
            $(x).fadeOut(400).remove();
        }, timeOut);
        $(x).click(function () {
            $(x).fadeOut(400).remove();
            clearTimeout(timer);
        });
        $(x).fadeIn(400).css('display', 'flex');
    },

    /**
     * Hàm show message success
     * @param {string} message
     * Author: LTQUAN (06/10/2020)
     * */
    success: (message) => {
        let icon = '<i class="fas fa-check"></i>';
        notification.onShowMessage('success', icon, message);
    },

    /**
     * Hàm show message warning
     * @param {string} message
     * Author: LTQUAN (06/10/2020)
     * */
    warning: (message) => {
        let icon = '<i class="fas fa-exclamation-circle"></i>';
        notification.onShowMessage('warning', icon, message);
    },

    /**
     * Hàm show message warning
     * @param {string} message
     * Author: LTQUAN (06/10/2020)
     * */
    infor: (message) => {
        let icon = '<i class="fas fa-info-circle"></i>';
        notification.onShowMessage('infor', icon, message);
    },

    /**
     * Hàm show message danger
     * @param {string} message
     * Author: LTQUAN (06/10/2020)
     * */
    danger: (message) => {
        let icon = '<i class="fas fa-exclamation-triangle"></i>';
        notification.onShowMessage('danger', icon, message);
    }
}