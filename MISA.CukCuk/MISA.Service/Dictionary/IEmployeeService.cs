using MISA.Entities;
using System.Collections.Generic;

namespace MISA.Service.Dictionary
{
    public interface IEmployeeService
    {
        /// <summary>
        /// Hàm lấy danh sách employee
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <returns>Danh sách employee</returns>
        IEnumerable<Employee> GetEmployees();

        /// <summary>
        /// Hàm lấy employee theo code
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="code"></param>
        /// <returns>Đối tượng employee</returns>
        Employee GetEmployeeById(string id);

        /// <summary>
        /// Hàm thêm mới employee
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="employee"></param>
        /// <returns>1: thao tác thành công, 0: fail</returns>
        int AddEmployee(Employee employee);

        /// <summary>
        /// Hàm cập nhật lại employee
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="employee"></param>
        /// <returns>1: thao tác thành công, 0: fail</returns>
        int UpdateEmployee(Employee employee);

        /// <summary>
        /// Hàm xóa employee theo code
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="code"></param>
        /// <returns>1: thao tác thành công, 0: fail</returns>
        int DeleteEmployee(string id);
    }
}
