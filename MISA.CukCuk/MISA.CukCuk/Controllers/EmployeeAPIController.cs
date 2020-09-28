using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MISA.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MISA.CukCuk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAPIController : ControllerBase
    {
        /**
         * Hàm load employeee, /api/EmployeeAPI
         * @returns {List<Employee>}
         * Author: LTQuan (28/09/2020)
         * */
        [Route("")]
        [HttpGet]
        public List<Employee> GetEmployees()
        {
            return Employee.Employees;
        }

        /**
         * Hàm load employee với employeeCode
         * @param {int} code
         * @returns {Employee}
         * Author: LTQuan (28/09/2020)
         * */
        [Route("{code}")]
        public Employee GetEmployeeByCode([FromRoute] string code)
        {
            return Employee.Employees.Where(x => x.EmployeeCode == code).FirstOrDefault();
        }

        /**
         * Hàm thêm mới employee
         * @param {Employee} employee
         * @returns {int}
         * Author: LTQuan (28/09/2020)
         * */
        [Route("")]
        [HttpPost]
        public int SaveEmployee([FromBody] Employee employee)
        {
            try
            {
                Employee.Employees.Add(employee);
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        /**
         * Hàm xóa employee theo code
         * @param {string} code
         * @returns {int}
         * Author: LTQuan (28/09/2020)
         * */
        [Route("{code}")]
        [HttpDelete]
        public bool DeleteEmployeeByCode([FromRoute] string code)
        {
            try
            {
                var employee = Employee.Employees.Where(x => x.EmployeeCode == code).FirstOrDefault();
                Employee.Employees.Remove(employee);
                return Employee.Employees.Remove(employee); ;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /**
         * Hàm cập nhật employee
         * @param {Employee} code
         * @return {int}
         * Author: LTQuan (28/09/2020)
         * */
        [Route("")]
        [HttpPut]
        public int UpdateEmployee([FromBody] Employee employee)
        {
            try
            {
                for (int i = 0; i < Employee.Employees.Count; i++)
                {
                    if (Employee.Employees[i].EmployeeCode == employee.EmployeeCode)
                    {
                        Employee.Employees[i] = employee;
                        break;
                    }
                }
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}