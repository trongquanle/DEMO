using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MISA.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Service.Dictionary.impl;

namespace MISA.CukCuk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerAPIController : ControllerBase
    {
        [Route("")]
        [HttpGet]
        public JsonResult GetCustomers()
        {
            return new JsonResult(Customer.Customers);
        }

        [Route("{id}")]
        [HttpGet]
        public JsonResult GetCustomer([FromRoute]string id)
        {
            return new JsonResult(Customer.Customers.Where(x => x.CustomerCode == id).FirstOrDefault());
        }

        [Route("")]
        [HttpPost]
        public JsonResult SaveCustomer([FromBody] Customer customer)
        {
            Customer.Customers.Add(customer);
            return new JsonResult(customer);
        }

        /**
         * Hàm update customer
         * param {customer} customer
         * returns {int}
         * Author: LTQuan (28/09/2020)
         * */
        [Route("")]
        [HttpPut]
        public int UpdateCustomer([FromBody] Customer customer)
        {
            try
            {
                for (int i = 0; i < Customer.Customers.Count; i++)
                {
                    if (Customer.Customers[i].CustomerCode == customer.CustomerCode)
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

        [Route("{id}")]
        [HttpDelete]
        public int DeleteCustomer([FromRoute]string id)
        {
            var customer = Customer.Customers.Where(x => x.CustomerCode == id).FirstOrDefault();
            if (customer != null)
            {
                Customer.Customers.Remove(customer);
                return 1;
            }
            return 0;
        }
    }
}