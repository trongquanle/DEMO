using MISA.Mapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace MISA.DAO.Base.impl
{
    public class AbstractDAO<T> : IGenericDAO<T>
    {
        private SqlConnection sqlConnection;
        private SqlCommand sqlCommand;
        private SqlDataReader sqlDataReader;
        public AbstractDAO()
        {
            string connectionString = "";
            // Khởi tạo phiên làm việc
            sqlConnection = new SqlConnection(connectionString);
            // Khởi tạo đối tượng để thực hiện thao tác với csdl
            sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandType = CommandType.StoredProcedure;
        }
        public IEnumerable<T> GetData(string query, IMapper<T> mapper)
        {
            //// Gán tham số đầu vào cho store
            //SetParameters(model);
            // Mở kết nối
            sqlConnection.Open();
            // Chạy truy vấn
            sqlDataReader = sqlCommand.ExecuteReader();
            //while (sqlDataReader.Read())
            //{
            //    var entity = Activator.CreateInstance<T>();
            //    for (int i = 0; i < sqlDataReader.FieldCount; i++)
            //    {
            //        // Lấy ra cột hiện tại
            //        string colName = sqlDataReader.GetName(i);
            //        // Lấy ra value hiện tại
            //        var value = sqlDataReader.GetValue(i);
            //        // Lấy ra property giống với tên cột thì gán dữ liệu tương ứng
            //        var property = entity.GetType().GetProperty(colName);
            //        if (property != null && value != DBNull.Value)
            //        {
            //            property.SetValue(entity, value, null);
            //        }
            //    }
            //    // Thêm đối tượng nhân viên vừa tìm được vào list
            //    yield return entity;
            //}
            return mapper.MapRows(sqlDataReader);
        }

        public IEnumerable<T> GetData(string query, IMapper<T> mapper, string id)
        {
            // Gán tham số ID cho store
            sqlCommand.Parameters.AddWithValue("@Id", id);
            // Mở kết nối
            sqlConnection.Open();
            // Chạy câu lệnh
            sqlDataReader = sqlCommand.ExecuteReader();
            return mapper.MapRows(sqlDataReader);
        }

        public int Query(string query, T model)
        {
            // Gán tham số đầu vào cho store
            SetParameters(model);
            // Mở kết nối
            sqlConnection.Open();
            // Chạy truy vấn và trả về kết quả
            return sqlCommand.ExecuteNonQuery();
        }
        private void SetParameters(T model)
        {
            foreach (var prop in model.GetType().GetProperties())
            {
                sqlCommand.Parameters.AddWithValue("@" + prop.Name, prop.GetValue(model, null));
            }
        }
        public void Dispose()
        {
            if (sqlDataReader != null)
            {
                sqlDataReader.Close();
            }
            sqlConnection.Close();
        }
    }
}
