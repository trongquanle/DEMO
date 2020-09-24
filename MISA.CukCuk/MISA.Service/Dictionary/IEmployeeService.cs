using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Dictionary
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetEmployees();
        Employee GetEmployees(string id);
    }
}
