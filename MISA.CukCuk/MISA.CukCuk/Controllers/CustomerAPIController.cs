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
            return new JsonResult(customer);
        }

        [Route("{id}")]
        [HttpDelete]
        public string DeleteCustomer([FromRoute]string id)
        {
            return id;
        }
    }
}