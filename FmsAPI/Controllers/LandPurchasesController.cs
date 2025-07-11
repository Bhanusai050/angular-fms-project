using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class LandPurchasesController : ApiController
    {
        private readonly ILandPurchaseService _landPurchaseService;

        public LandPurchasesController(ILandPurchaseService landPurchaseService)
        {
            _landPurchaseService = landPurchaseService;
        }

        [HttpGet]
        [Route("GetLandPurchases")]
        public IHttpActionResult GetLandPurchases()
        {
            var landPurchases = _landPurchaseService.GetLandPurchases();

           

            return Ok(landPurchases);
        }


        [HttpPost]
        [Route("PostLandPurchase")]
        public IHttpActionResult PostLandPurchase([FromBody] LandPurchas landPurchas)
        {
            if (landPurchas == null)
            {
                return BadRequest("Invalid data.");
            }

            _landPurchaseService.AddLandPurchase(landPurchas);
            return Ok("Land purchase added successfully.");
        }



        [HttpDelete]
        [Route("DeleteLandPurchas/{id}")]
        public IHttpActionResult DeleteLandPurchas(int id)
        {
            var success = _landPurchaseService.DeleteLandPurchas(id);
            if (!success)
            {
                return NotFound(); // 404
            }
            return Ok("Deleted successfully."); // 200
        }
    }
}
