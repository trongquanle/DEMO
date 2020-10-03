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
            try
            {
                Customer.Customers.Add(customer);
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public int DeleteCustomer(string id)
        {
            var customer = Customer.Customers.Where(x => x.CustomerID.ToString() == id).FirstOrDefault();
            if(customer != null)
            {
                Customer.Customers.Remove(customer);
                return 1;
            }
            return 0;
        }

        public Customer GetCustomerById(string id)
        {
            return Customer.Customers.Where(x => x.CustomerID.ToString() == id).FirstOrDefault();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            //using(ICustomerDAO customerDAO = new CustomerDAO())
            //{
            //    return customerDAO.GetCustomers();
            //}
            return Customer.Customers;
        }

        public int UpdateCustomer(Customer customer)
        {
            try
            {
                for (int i = 0; i < Customer.Customers.Count; i++)
                {
                    if (Customer.Customers[i].CustomerID == customer.CustomerID)
                    {
                        Customer.Customers[i] = customer;
                        return 1;
                    }
                }
                return -1;
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
