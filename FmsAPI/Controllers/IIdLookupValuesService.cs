using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Controllers
{
    public interface IIdLookupValuesService
    {
        List<IdLookupValue> GetIdLookupValues();
    }
}
