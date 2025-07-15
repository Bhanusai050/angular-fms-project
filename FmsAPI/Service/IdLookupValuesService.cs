using FmsAPI.Controllers;
using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class IdLookupValuesService: IIdLookupValuesService
    {
    FarmManagementSystemEnities context = new FarmManagementSystemEnities();

        public List<IdLookupValue> GetIdLookupValues()
        {
            return context.IdLookupValues.ToList(); 
        }
    }
}
