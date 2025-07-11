using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class ProductionService: IProductionService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Production> GetProductions()
        {
            return context.Productions.ToList(); 
        }
    }
}