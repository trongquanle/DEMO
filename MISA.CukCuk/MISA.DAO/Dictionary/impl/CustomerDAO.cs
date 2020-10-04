using MISA.DAO.Base.impl;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MISA.DAO.Dictionary.impl
{
    public class CustomerDAO : AbstractDAO<Customer>, ICustomerDAO
    {
        public int AddCustomer(Customer customer)
        {
            return this.Query("PROC_InsertCustomer", customer);
        }

        public int DeleteCustomer(string id)
        {
            return this.DeleteByID("PROC_DeleteCustomer", id);
        }

        public Customer GetCustomerByID(string id)
        {
            return this.GetData("PROC_GetCustomerByID", id).FirstOrDefault();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            try
            {
                return this.GetData("PROC_GetCustomers");
            }
            catch (Exception)
            {
                return null;
            }
        }

        public int UpdateCustomer(Customer customer)
        {
            return this.Query("PROC_UpdateCustomer", customer);
        }
    }
}
