using MISA.DAO.Dictionary;
using MISA.Entities;
using System.Collections.Generic;

namespace MISA.Service.Dictionary.impl
{
    public class CustomerService : ICustomerService
    {

        private readonly ICustomerDAO _customerDAO;

        public CustomerService(ICustomerDAO customerDAO)
        {
            _customerDAO = customerDAO;
        }

        public int AddCustomer(Customer customer)
        {
            return _customerDAO.AddCustomer(customer);
        }

        public int DeleteCustomer(string id)
        {
            return _customerDAO.DeleteCustomer(id);
        }

        public Customer GetCustomerById(string id)
        {
            return _customerDAO.GetCustomerByID(id);
        }

        public IEnumerable<Customer> GetCustomers()
        {
            return _customerDAO.GetCustomers();
        }

        public int UpdateCustomer(Customer customer)
        {
            return _customerDAO.UpdateCustomer(customer);
        }
    }
}
