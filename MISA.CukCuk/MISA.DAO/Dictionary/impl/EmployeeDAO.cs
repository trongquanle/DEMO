using DAO.Base.impl;
using Entities;
using Mapper.impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAO.Dictionary.impl
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
