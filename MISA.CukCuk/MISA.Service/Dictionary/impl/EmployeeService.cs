using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MISA.Service.Dictionary.impl
{
    public class EmployeeService : IEmployeeService
    {

        //private readonly IEmployeeService _employeeService;

        //public EmployeeService(IEmployeeService employeeService)
        //{
        //    _employeeService = employeeService;
        //}

        public int AddEmployee(Employee employee)
        {
            try
            {
                employee.EmployeeID = Guid.NewGuid();
                Employee.Employees.Add(employee);
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public int DeleteEmployee(string id)
        {
            var employee = Employee.Employees.Where(x => x.EmployeeID.ToString() == id).FirstOrDefault();
            if(employee != null)
            {
                Employee.Employees.Remove(employee);
                return 1;
            }
            return 0;
        }

        public Employee GetEmployeeById(string id)
        {
            //using (IEmployeeDAO employeeDAO = new EmployeeDAO())
            //{
            //    return employeeDAO.GetEmployeeById(code);
            //}
            return Employee.Employees.Where(x => x.EmployeeID.ToString() == id).FirstOrDefault();
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
                    if (Employee.Employees[i].EmployeeID == employee.EmployeeID)
                    {
                        Employee.Employees[i] = employee;
                        return 1;
                    }
                }
                return 0;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
