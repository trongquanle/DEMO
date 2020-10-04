using System;
using System.Collections.Generic;

namespace MISA.Entities
{
    public class Customer
    {
        /// <summary>
        /// ID
        /// </summary>
        public Guid CustomerID { get; set; }
        
        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; }

        /// <summary>
        /// Tên khách hàng
        /// </summary>
        public string CustomerName { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBrith { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string SDT { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Số tiền nợ
        /// </summary>
        public double? DebtMoney { get; set; }

        /// <summary>
        /// Ngày Tạo
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Ngày sửa
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
    }
}
