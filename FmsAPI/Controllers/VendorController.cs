using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class VendorController : ApiController
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet]
        [Route("GetVendors")]
        public IHttpActionResult GetVendors()
        {
            var vendors = _vendorService.GetVendors();
            return Ok(vendors);
        }
    }
}
