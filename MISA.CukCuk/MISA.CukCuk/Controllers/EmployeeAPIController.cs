using System;
using System.Collections.Generic;
using System.Linq;
using MISA.Entities;
using Microsoft.AspNetCore.Mvc;
using MISA.Service.Dictionary;

namespace MISA.CukCuk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAPIController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeAPIController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        /// <summary>
        /// Hàm xử lý request lấy danh sách employee, nhận req GET
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <returns></returns>
        [Route("")]
        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            return _employeeService.GetEmployees();
        }

        /// <summary>
        /// Hàm xử lý request load employee với employeeCode
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="code"></param>
        /// <returns></returns>
        [Route("{code}")]
        public Employee GetEmployeeByCode([FromRoute] string code)
        {
            return _employeeService.GetEmployeeByCode(code);
        }

        /// <summary>
        /// Hàm xử lý request thêm mới employee, nhận req POST
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="employee"></param>
        /// <returns></returns>
        [Route("")]
        [HttpPost]
        public int SaveEmployee([FromBody] Employee employee)
        {
            return _employeeService.AddEmployee(employee);
        }

        /// <summary>
        /// Hàm xử lý request xóa employee, method: DELETE
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="code"></param>
        /// <returns></returns>
        [Route("{code}")]
        [HttpDelete]
        public int DeleteEmployeeByCode([FromRoute] string code)
        {
            return _employeeService.DeleteEmployee(code);
        }

        /// <summary>
        /// Hàm xử lý request cập nhật employee, method: PUT
        /// </summary>
        /// Author: LTQuan (30/09/2020)
        /// <param name="employee"></param>
        /// <returns></returns>
        [Route("")]
        [HttpPut]
        public int UpdateEmployee([FromBody] Employee employee)
        {
            return _employeeService.UpdateEmployee(employee);
        }
    }
}