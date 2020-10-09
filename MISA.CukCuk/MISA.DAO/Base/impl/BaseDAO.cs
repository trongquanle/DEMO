using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace MISA.DAO.Base.impl
{
    public class BaseDAO<T> : IGenericDAO<T>
    {

        private MySqlConnection sqlConnection;
        private MySqlCommand sqlCommand;
        private MySqlDataReader sqlDataReader;
        private MySqlTransaction transaction;

        public BaseDAO()
        {
            string connectionString = "Server=35.194.166.58;Port=3306;Database=MISACukCuk_F09_LTQUAN;User=nvmanh;Password=12345678@Abc";
            // Khởi tạo phiên làm việc
            sqlConnection = new MySqlConnection(connectionString);
            // Khởi tạo đối tượng để thực hiện thao tác với csdl
            sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandType = CommandType.StoredProcedure;
        }

        public IEnumerable<T> GetData(string query)
        {
            sqlCommand.CommandText = query;
            //// Gán tham số đầu vào cho store
            //SetParameters(model);
            // Mở kết nối
            sqlConnection.Open();
            // Chạy truy vấn
            sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    // Lấy ra cột hiện tại
                    string colName = sqlDataReader.GetName(i);
                    // Lấy ra value hiện tại
                    var value = sqlDataReader.GetValue(i);
                    // Lấy ra property giống với tên cột thì gán dữ liệu tương ứng
                    var property = entity.GetType().GetProperty(colName);
                    if (property != null && value != DBNull.Value)
                    {
                        property.SetValue(entity, value);
                    }
                }
                // Thêm đối tượng nhân viên vừa tìm được vào list
                yield return entity;
            }
        }

        public IEnumerable<T> GetData(string query, string id)
        {
            sqlCommand.CommandText = query;
            // Gán tham số ID cho store
            sqlCommand.Parameters.AddWithValue("ID", id);
            // Mở kết nối
            sqlConnection.Open();
            // Chạy câu lệnh
            sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var entity = Activator.CreateInstance<T>();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    // Lấy ra cột hiện tại
                    string colName = sqlDataReader.GetName(i);
                    // Lấy ra value hiện tại
                    var value = sqlDataReader.GetValue(i);
                    // Lấy ra property giống với tên cột thì gán dữ liệu tương ứng
                    var property = entity.GetType().GetProperty(colName);
                    if (property != null && value != DBNull.Value)
                    {
                        property.SetValue(entity, value);
                    }
                }
                // Thêm đối tượng nhân viên vừa tìm được vào collection
                yield return entity;
            }
            //sqlDataReader.Close();
        }

        public int Query(string query, T model)
        {
            sqlCommand.CommandText = query;
            // Gán tham số đầu vào cho store
            SetParameters(model);
            // Mở kết nối
            sqlConnection.Open();
            // Khởi Tạo transation
            transaction = sqlConnection.BeginTransaction();
            sqlCommand.Transaction = transaction;
            // Chạy truy vấn và trả về kết quả
            int result = 0;
            try
            {
                result = sqlCommand.ExecuteNonQuery();
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
            return result;
        }

        public int DeleteByID(string query, string id)
        {
            sqlCommand.CommandText = query;
            // Gán tham số đầu vào cho store
            sqlCommand.Parameters.AddWithValue("ID", id);
            // Mở kết nối
            sqlConnection.Open();
            transaction = sqlConnection.BeginTransaction();
            sqlCommand.Transaction = transaction;
            // Chạy truy vấn và trả về kết quả
            int result = 0;
            try
            {
                result = sqlCommand.ExecuteNonQuery();
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
            return result;
        }

        /// TODO: Cần xử lý tiếp...
        
        /// <summary>
        /// Hàm set param cho store procedure với obj T
        /// </summary>
        /// Author: LTQUAN (04/10/2020)
        private void SetParameters(T model)
        {
            foreach (var prop in model.GetType().GetProperties())
            {
                sqlCommand.Parameters.AddWithValue(prop.Name, prop.GetValue(model, null) ?? DBNull.Value);
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
