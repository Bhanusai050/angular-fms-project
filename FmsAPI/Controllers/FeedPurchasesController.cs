using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class FeedPurchasesController : ApiController
    {
        private readonly IFeedPurchaseService _feedPurchaseService;

        public FeedPurchasesController(IFeedPurchaseService feedPurchaseService)
        {
            _feedPurchaseService = feedPurchaseService;
        }

        [HttpGet]
        [Route("GetFeedPurchases")]
        public IHttpActionResult GetFeedPurchases()
        {
            var purchases = _feedPurchaseService.GetFeedPurchases();


            return Ok(purchases);
        }
    }
}
