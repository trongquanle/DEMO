using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DAO.Dictionary
{
    public interface ICustomerDAO
    {
        IEnumerable<Customer> GetCustomers();
    }
}
