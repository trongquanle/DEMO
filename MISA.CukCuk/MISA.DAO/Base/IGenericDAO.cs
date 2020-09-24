using Mapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAO.Base
{
    public interface IGenericDAO<T>
    {
        int Query(string query, T model);
        IEnumerable<T> GetData(string query, IMapper<T> mapper);
        IEnumerable<T> GetData(string query, IMapper<T> mapper, string id);
    }
}
