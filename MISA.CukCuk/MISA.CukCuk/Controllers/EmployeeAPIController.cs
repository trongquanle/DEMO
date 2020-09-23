using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MISA.CukCuk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAPIController : ControllerBase
    {
        [Route("")]
        [HttpGet]
        public JsonResult GetEmployees()
        {
            var employees = new List<Employee>()
            {
                new Employee(){ EmployeeCode="NV001", EmployeeName="Lê Huy Tuân", Email="tuandz@gmail.com", SDT="12356214521", CompanyName="Công ty cổ phần MISA"},
                new Employee(){ EmployeeCode="NV002", EmployeeName="Nguyễn Anh Tuấn", Email="tuanna@gmail.com", SDT="23641721278", CompanyName="Đại học Bách Khoa"},
                new Employee(){ EmployeeCode="NV003", EmployeeName="Trương Xuấn Chiểu", Email="chieuz@gmail.com", SDT="76234622332", CompanyName="Đại học Quốc Gia Hà Nội"},
                new Employee(){ EmployeeCode="NV004", EmployeeName="Chu Trần Đại", Email="daidz@gmail.com", SDT="23654121277", CompanyName="Đại học Công Nghiệp Hà Nội"},
                new Employee(){ EmployeeCode="NV005", EmployeeName="Đoàn Văn Lực", Email="lucdz@gmail.com", SDT="34578756348", CompanyName="Đại học Giao Thông Vận Tải"},
            };
            return new JsonResult(employees);
        }
        [Route("")]
        [HttpPost]
        public JsonResult SaveEmployee([FromBody] Employee employee)
        {
            return new JsonResult(employee);
        }
    }
}