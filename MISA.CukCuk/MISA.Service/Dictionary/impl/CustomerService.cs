using MISA.DAO.Dictionary;
using MISA.DAO.Dictionary.impl;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MISA.Service.Dictionary.impl
{
    public class CustomerService : ICustomerService
    {
        public int AddCustomer(Customer customer)
        {
            using (ICustomerDAO customerDAO = new CustomerDAO())
            {
                return customerDAO.AddCustomer(customer);
            }
        }

        public int DeleteCustomer(string id)
        {
            using(ICustomerDAO customerDAO = new CustomerDAO())
            {
                return customerDAO.DeleteCustomer(id);
            }
        }

        public Customer GetCustomerById(string id)
        {
            using (ICustomerDAO customerDAO = new CustomerDAO())
            {
                return customerDAO.GetCustomerByID(id);
            }
            //return Customer.Customers.Where(x => x.CustomerID.ToString() == id).FirstOrDefault();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            using (ICustomerDAO customerDAO = new CustomerDAO())
            {
                return customerDAO.GetCustomers();
            }
        }

        public int UpdateCustomer(Customer customer)
        {
            using(ICustomerDAO customerDAO = new CustomerDAO())
            {
                return customerDAO.UpdateCustomer(customer);
            }
        }
    }
}
