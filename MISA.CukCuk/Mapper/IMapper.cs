﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace Mapper
{
    public interface IMapper<T>
    {
        IEnumerable<T> MapRows(SqlDataReader sqlDataReader);
    }
}
