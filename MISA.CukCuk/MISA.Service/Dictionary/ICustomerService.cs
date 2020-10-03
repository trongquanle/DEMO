using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Service.Dictionary
{
    public interface ICustomerService
    {
        /// <summary>
        /// Hàm lấy danh sách customer
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <returns>Danh sách customer</returns>
        IEnumerable<Customer> GetCustomers();

        /// <summary>
        /// Hàm lấy customer theo code
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="code"></param>
        /// <returns>Đối tượng customer</returns>
        Customer GetCustomerById(string id);

        /// <summary>
        /// Hàm thêm mới customer
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="customer"></param>
        /// <returns>1: thao tác thành công, 0: fail</returns>
        int AddCustomer(Customer customer);

        /// <summary>
        /// Hàm cập nhật lại customer
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="customer"></param>
        /// <returns>1: thao tác thành công, 0: fail</returns>
        int UpdateCustomer(Customer customer);

        /// <summary>
        /// Hàm xóa customer theo code
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="code"></param>
        /// <returns>1: thao tác thành công, 0: fail</returns>
        int DeleteCustomer(string id);

    }
}
