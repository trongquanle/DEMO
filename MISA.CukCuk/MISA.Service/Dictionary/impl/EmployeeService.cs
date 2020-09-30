using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MISA.Service.Dictionary.impl
{
    public class EmployeeService : IEmployeeService
    {
        public int AddEmployee(Employee employee)
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

        public int DeleteEmployee(string code)
        {
            var employee = Employee.Employees.Where(x => x.EmployeeCode == code).FirstOrDefault();
            if(employee != null)
            {
                Employee.Employees.Remove(employee);
                return 1;
            }
            return 0;
        }

        public Employee GetEmployeeByCode(string code)
        {
            //using (IEmployeeDAO employeeDAO = new EmployeeDAO())
            //{
            //    return employeeDAO.GetEmployeeById(code);
            //}
            return Employee.Employees.Where(x => x.EmployeeCode == code).FirstOrDefault();
        }

        public IEnumerable<Employee> GetEmployees()
        {
            // Logic

            // Gọi xuống tầng DAO
            //using (IEmployeeDAO employeeDAO = new EmployeeDAO())
            //{
            //    return employeeDAO.GetEmployees();
            //}

            return Employee.Employees;
        }

        public int UpdateEmployee(Employee employee)
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
