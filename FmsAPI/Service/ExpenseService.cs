using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class ExpenseService: IExpenseService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Expens> GetExpenses()
        {
            return context.Expenses.ToList(); 
        }
    }
}