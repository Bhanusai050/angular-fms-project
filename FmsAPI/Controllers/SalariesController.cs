using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class SalariesController : ApiController
    {
        private readonly ISalaryService _salaryService;

        public SalariesController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [HttpGet]
        [Route("GetSalaries")]
        public IHttpActionResult GetSalaries()
        {
            var salaries = _salaryService.GetSalaries();

            

            return Ok(salaries);
        }
    }
}
