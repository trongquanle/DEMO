using MISA.DAO.Base.impl;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DAO.Dictionary.impl
{
    public class CustomerDAO : AbstractDAO<Customer>, ICustomerDAO
    {
        public IEnumerable<Customer> GetCustomers()
        {
            return Customer.Customers;
        }
    }
}
