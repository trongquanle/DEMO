using System;
using System.Collections.Generic;

namespace MISA.Entities
{
    public class Customer
    {
        public static List<Customer> Customers = new List<Customer>()
        {
            new Customer(){ CustomerCode="NV001", CustomerName="Lê Huy Tuân", TaxCode="MST8123749832", Address="Cầu giấy, Láng Thượng, Đống Đa, Hà Nội", Email="tuandz@gmail.com", SDT="12356214521", CompanyName="Công ty cổ phần MISA"},
            new Customer(){ CustomerCode="NV002", CustomerName="Nguyễn Anh Tuấn", TaxCode="MST8123749832", Address="Cầu giấy, Láng Thượng, Đống Đa, Hà Nội", Email="tuanna@gmail.com", SDT="23641721278", CompanyName="Đại học Bách Khoa"},
            new Customer(){ CustomerCode="NV003", CustomerName="Trương Xuấn Chiểu", TaxCode="MST8123749832", Address="Cầu giấy, Láng Thượng, Đống Đa, Hà Nội", Email="chieuz@gmail.com", SDT="76234622332", CompanyName="Đại học Quốc Gia Hà Nội"},
            new Customer(){ CustomerCode="NV004", CustomerName="Chu Trần Đại", TaxCode="MST8123749832", Address="Cầu giấy, Láng Thượng, Đống Đa, Hà Nội", Email="daidz@gmail.com", SDT="23654121277", CompanyName="Đại học Công Nghiệp Hà Nội"},
            new Customer(){ CustomerCode="NV005", CustomerName="Đoàn Văn Lực", TaxCode="MST8123749832", Address="Cầu giấy, Láng Thượng, Đống Đa, Hà Nội", Email="lucdz@gmail.com", SDT="34578756348", CompanyName="Đại học Giao Thông Vận Tải"},
        };
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string CompanyName { get; set; }
        public string TaxCode { get; set; }
        public string Address { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
    }
}
