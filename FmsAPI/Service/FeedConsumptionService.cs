using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class FeedConsumptionService: IFeedConsumptionService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Feed_Consumption> GetFeedConsumptions()
        {
            return context.Feed_Consumption.ToList(); 
        }
    }
}