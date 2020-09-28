using MISA.DAO.Base;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DAO.Dictionary
{
    public interface IEmployeeDAO : IGenericDAO<Employee>
    {
        IEnumerable<Employee> GetEmployees();
        Employee GetEmployeeById(string id);
    }
}
