using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class FeedConsumptionController : ApiController
    {
        private readonly IFeedConsumptionService _feedConsumptionService;

        public FeedConsumptionController(IFeedConsumptionService feedConsumptionService)
        {
            _feedConsumptionService = feedConsumptionService;
        }

        [HttpGet]
        [Route("GetFeed_Consumptions")]
        public IHttpActionResult GetFeedConsumptions()
        {
            var consumptions = _feedConsumptionService.GetFeedConsumptions();

           

            return Ok(consumptions);
        }
    }
}
