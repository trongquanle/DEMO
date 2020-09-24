using Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Mapper.impl
{
    public class EmployeeMapper : IMapper<Employee>
    {
        public IEnumerable<Employee> MapRows(SqlDataReader sqlDataReader)
        {
            while (sqlDataReader.Read())
            {
                var employee = new Employee();
                for(int i=0; i< sqlDataReader.FieldCount; i++)
                {
                    // Lấy ra cột hiện tại
                    string colName = sqlDataReader.GetName(i);
                    // Lấy ra value hiện tại
                    var value = sqlDataReader.GetValue(i);
                    // Lấy ra property giống với tên cột thì gán dữ liệu tương ứng
                    var property = employee.GetType().GetProperty(colName);
                    if(property != null && value != DBNull.Value)
                    {
                        property.SetValue(employee, value, null);
                    }
                }
                // Thêm đối tượng nhân viên vừa tìm được vào list
                yield return employee;
            }
        }
    }
}
