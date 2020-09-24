using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAO.Dictionary
{
    public interface IEmployeeDAO
    {
        IEnumerable<Employee> GetEmployees();
        Employee GetEmployeeById(string id);
    }
}
