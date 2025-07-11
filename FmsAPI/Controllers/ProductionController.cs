using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class ProductionController : ApiController
    {
        private readonly IProductionService _productionService;

        public ProductionController(IProductionService productionService)
        {
            _productionService = productionService;
        }

        [HttpGet]
        [Route("GetProduction")]
        public IHttpActionResult GetProductions()
        {
            var productions = _productionService.GetProductions();

            

            return Ok(productions);
        }
    }
}
