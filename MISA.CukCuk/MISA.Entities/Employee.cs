using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Entities
{
    public class Employee
    {
        public static List<Employee> Employees = new List<Employee>()
        {
            new Employee()
            {
                EmployeeCode="NV001",
                EmployeeName="Lê Huy Tuân",
                Gender=1,
                DateOfBrith=DateTime.Now,
                Mobile="76234717247",
                PossionName="Nhân viên",
                DepartmentName="Nhân sự",
                Email="tuandz@gmail.com",
                Salary=2000000,
                WorkStatus="Tốt"
            },
            new Employee()
            {
                EmployeeCode="NV002",
                EmployeeName="Nguyễn Anh Tuấn",
                Gender=1,
                DateOfBrith=DateTime.Now,
                Mobile="76234717247",
                PossionName="Nhân viên",
                DepartmentName="Nhân sự",
                Email="tuannadz@gmail.com",
                Salary=2000000,
                WorkStatus="Tốt"
            },
            new Employee()
            {
                EmployeeCode="NV003",
                EmployeeName="Trương Xuấn Chiểu",
                Gender=1,
                DateOfBrith=DateTime.Now,
                Mobile="76234717247",
                PossionName="Nhân viên",
                DepartmentName="Nhân sự",
                Email="chieudz@gmail.com",
                Salary=2000000,
                WorkStatus="Tốt"
            },
            new Employee()
            {
                EmployeeCode="NV004",
                EmployeeName="Chu Trần Đại",
                Gender=1,
                DateOfBrith=DateTime.Now,
                Mobile="76234717247",
                PossionName="Nhân viên",
                DepartmentName="Nhân sự",
                Email="daidz@gmail.com",
                Salary=2000000,
                WorkStatus="Tốt"
            },
            new Employee()
            {
                EmployeeCode="NV005",
                EmployeeName="Đoàn Văn Lực",
                Gender=1,
                DateOfBrith=DateTime.Now,
                Mobile="76234717247",
                PossionName="Nhân viên",
                DepartmentName="Nhân sự",
                Email="lucdz@gmail.com",
                Salary=2000000,
                WorkStatus="Tốt"
            },
        };
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public int Gender { get; set; }
        public DateTime? DateOfBrith { get; set; }
        public string Mobile { get; set; }
        public string PossionName { get; set; }
        public string DepartmentName { get; set; }
        public string Email { get; set; }
        public double? Salary { get; set; }
        public string WorkStatus { get; set; }
    }
}
