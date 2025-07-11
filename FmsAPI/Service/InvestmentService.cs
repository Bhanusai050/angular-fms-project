using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class InvestmentService: IInvestmentService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Investment> GetInvestments()
        {
            return context.Investments.ToList();
        }

        public void AddInvestment(Investment investment)
        {
            context.Investments.Add(investment);
            context.SaveChanges();
        }


        public bool DeleteInvestment(int id)
        {
            var investment = context.Investments.Find(id);
            if (investment == null)
                return false;

            context.Investments.Remove(investment);
            context.SaveChanges();
            return true;
        }
    }
}