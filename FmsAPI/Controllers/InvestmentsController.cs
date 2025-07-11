using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FmsAPI.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class InvestmentsController : ApiController
    {
        private readonly IInvestmentService _investmentService;

        public InvestmentsController(IInvestmentService investmentService)
        {
            _investmentService = investmentService;
        }

        [HttpGet]
        [Route("GetInvestments")]
        public IHttpActionResult GetInvestments()
        {
            var investments = _investmentService.GetInvestments();

           
            return Ok(investments);
        }



        [HttpPost]
        [Route("PostInvestment")]
        public IHttpActionResult PostInvestment([FromBody] Investment investment)
        {
            if (investment == null)
                return BadRequest("Invalid investment data.");

            _investmentService.AddInvestment(investment);
            return Ok("Investment added successfully.");
        }



        [HttpDelete]
        [Route("DeleteInvestment/{id}")]
        public IHttpActionResult DeleteInvestment(int id)
        {
            var isDeleted = _investmentService.DeleteInvestment(id);

            if (!isDeleted)
                return NotFound();

            return Ok("Investment deleted successfully.");
        }

    }
}
