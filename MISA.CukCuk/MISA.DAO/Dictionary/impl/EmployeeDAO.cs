using MISA.DAO.Base.impl;
using MISA.Entities;
using MISA.Mapper.impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MISA.DAO.Dictionary.impl
{
    public class EmployeeDAO : AbstractDAO<Employee>, IEmployeeDAO
    {
        public Employee GetEmployeeById(string id)
        {
            return this.GetData("", new EmployeeMapper(), id).FirstOrDefault();
        }

        public IEnumerable<Employee> GetEmployees()
        {
            return this.GetData("", new EmployeeMapper());
        }
    }
}
