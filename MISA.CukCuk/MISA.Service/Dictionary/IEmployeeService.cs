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
        /// <returns></returns>
        IEnumerable<Employee> GetEmployees();

        /// <summary>
        /// Hàm lấy employee theo code
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="code"></param>
        /// <returns></returns>
        Employee GetEmployeeByCode(string code);

        /// <summary>
        /// Hàm thêm mới employee
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="employee"></param>
        /// <returns></returns>
        int AddEmployee(Employee employee);

        /// <summary>
        /// Hàm cập nhật lại employee
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="employee"></param>
        /// <returns></returns>
        int UpdateEmployee(Employee employee);

        /// <summary>
        /// Hàm xóa employee theo code
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="code"></param>
        /// <returns></returns>
        int DeleteEmployee(string code);
    }
}
