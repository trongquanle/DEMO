using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Service.Dictionary
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetCustomers();
    }
}
