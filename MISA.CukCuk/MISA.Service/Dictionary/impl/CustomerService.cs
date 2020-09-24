using MISA.DAO.Dictionary;
using MISA.DAO.Dictionary.impl;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Service.Dictionary.impl
{
    public class CustomerService : ICustomerService
    {
        public IEnumerable<Customer> GetCustomers()
        {
            using(CustomerDAO customerDAO = new CustomerDAO())
            {
                return customerDAO.GetCustomers();
            }
        }
    }
}
