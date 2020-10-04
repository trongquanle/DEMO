using System;
using System.Collections.Generic;

namespace MISA.DAO.Base
{
    public interface IGenericDAO<T> : IDisposable
    {
        /// <summary>
        /// Hàm thực hiện chạy các thủ tục thêm/sửa
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <param name="query"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        int Query(string query, T model);

        /// <summary>
        /// Hàm thực hiện chạy các thủ tục xóa dữ liệu
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <param name="query"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        int DeleteByID(string query, string id);

        /// <summary>
        /// Hàm thực hiện chạy các thủ tục lấy dữ liệu
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <param name="query"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        IEnumerable<T> GetData(string query);

        /// <summary>
        /// Hàm thực hiện chạy các thủ tục lấy dữ liệu
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        /// <param name="query"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        IEnumerable<T> GetData(string query, string id);
    }
}
