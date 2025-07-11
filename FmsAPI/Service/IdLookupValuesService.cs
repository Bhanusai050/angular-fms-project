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
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<IdLookupValue> GetIdLookupValues()
        {
            return context.IdLookupValues.ToList(); 
        }
    }
}