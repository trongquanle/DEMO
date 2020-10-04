using MISA.DAO.Base.impl;
using MISA.Entities;
using System.Collections.Generic;
using System.Linq;

namespace MISA.DAO.Dictionary.impl
{
    public class EmployeeDAO : AbstractDAO<Employee>, IEmployeeDAO
    {
        public Employee GetEmployeeById(string id)
        {
            return this.GetData("SELECT * FROM Customer;", id).FirstOrDefault();
        }

        public IEnumerable<Employee> GetEmployees()
        {
            return this.GetData("");
        }
    }
}
