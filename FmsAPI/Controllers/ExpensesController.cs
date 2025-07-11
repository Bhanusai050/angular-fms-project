using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class ExpensesController : ApiController
    {
        private readonly IExpenseService _expenseService;

        public ExpensesController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        [Route("GetExpenses")]
        public IHttpActionResult GetExpenses()
        {
            var expenses = _expenseService.GetExpenses();

            
            return Ok(expenses);
        }
    }
}
