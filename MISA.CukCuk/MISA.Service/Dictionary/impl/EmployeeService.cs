using MISA.DAO.Dictionary.impl;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Service.Dictionary.impl
{
    public class EmployeeService : IEmployeeService
    {
        public IEnumerable<Employee> GetEmployees()
        {
            // Logic

            // Gọi xuống tầng DAO
            using (EmployeeDAO employeeDAO = new EmployeeDAO())
            {
                return employeeDAO.GetEmployees();
            }
        }

        public Employee GetEmployees(string id)
        {
            using (EmployeeDAO employeeDAO = new EmployeeDAO())
            {
                return employeeDAO.GetEmployeeById(id);
            }
        }
    }
}
