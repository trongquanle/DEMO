using System;
using System.Collections.Generic;

namespace MISA.Entities
{
    public class Customer
    {
        public static List<Customer> Customers = new List<Customer>()
        {
            new Customer(){ CustomerCode="NV001", CustomerName="Lê Huy Tuân", Gender="Nam", DateOfBrith=DateTime.Now, Address="Số 3 Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội", Email="tuandz@gmail.com", SDT="12356214521", DebtMoney=1000000},
            new Customer(){ CustomerCode="NV002", CustomerName="Nguyễn Anh Tuấn", Gender="Nam", DateOfBrith=DateTime.Now, Address="Số 3 Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội", Email="tuanna@gmail.com", SDT="23641721278", DebtMoney=1000000},
            new Customer(){ CustomerCode="NV003", CustomerName="Trương Xuấn Chiểu", Gender="Nam", DateOfBrith=DateTime.Now, Address="Số 3 Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội", Email="chieuz@gmail.com", SDT="76234622332", DebtMoney=1000000},
            new Customer(){ CustomerCode="NV004", CustomerName="Chu Trần Đại", Gender="Nam", DateOfBrith=new DateTime(1997, 1, 1), Address="Số 3 Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội", Email="daidz@gmail.com", SDT="23654121277", DebtMoney=1000000},
            new Customer(){ CustomerCode="NV005", CustomerName="Đoàn Văn Lực", Gender="Nam", DateOfBrith=new DateTime(1997, 10, 4), Address="Số 3 Cầu Giấy, Láng Thượng, Đống Đa, Hà Nội", Email="lucdz@gmail.com", SDT="34578756348", DebtMoney=1000000},
        };
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBrith { get; set; }
        public string Address { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public double DebtMoney { get; set; }
    }
}
