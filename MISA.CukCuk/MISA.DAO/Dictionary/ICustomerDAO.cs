using MISA.DAO.Base;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DAO.Dictionary
{
    public interface ICustomerDAO : IGenericDAO<Customer>
    {
        /// <summary>
        /// Hàm lấy danh sách khách hàng
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <returns>Danh sách khách hàng</returns>
        IEnumerable<Customer> GetCustomers();

        /// <summary>
        /// Hàm lấy thông tin khách hàng theo id
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <returns>Chi tiết thông tin khách hàng</returns>
        Customer GetCustomerByID(string id);

        /// <summary>
        /// Hàm thêm mới khách hàng
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <param name="customer"></param>
        /// <returns></returns>
        int AddCustomer(Customer customer);

        /// <summary>
        /// Hàm cập nhật lại thông tin khách hàng
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <param name="customer"></param>
        /// <returns></returns>
        int UpdateCustomer(Customer customer);

        /// <summary>
        /// Hàm xóa khách hàng hỏi hệ thống
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <param name="id"></param>
        /// <returns></returns>
        int DeleteCustomer(string id);
    }
}
