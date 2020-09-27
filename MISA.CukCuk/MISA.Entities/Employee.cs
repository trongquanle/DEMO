using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Entities
{
    public class Employee
    {
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public int Gender { get; set; }
        public DateTime DateOfBrith { get; set; }
        public string Mobile { get; set; }
        public string PossionName { get; set; }
        public string DepartmentName { get; set; }
        public string Email { get; set; }
        public double Salary { get; set; }
        public string WorkStatus { get; set; }
    }
}
