﻿using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DAO.Dictionary
{
    public interface IEmployeeDAO
    {
        IEnumerable<Employee> GetEmployees();
        Employee GetEmployeeById(string id);
    }
}
