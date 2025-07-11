using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class IdLookupService: IIdLookupService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<IdLookup> GetIdLookups()
        {
            return context.IdLookups.ToList();
        }
    }
}