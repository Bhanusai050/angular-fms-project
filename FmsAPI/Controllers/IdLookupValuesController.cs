using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class IdLookupValuesController : ApiController
    {
        private readonly IIdLookupValuesService _lookupValuesService;

        public IdLookupValuesController(IIdLookupValuesService lookupValuesService)
        {
            _lookupValuesService = lookupValuesService;
        }

        [HttpGet]
        [Route("GetIdLookupValues")]
        public IHttpActionResult GetIdLookupValues()
        {
            var values = _lookupValuesService.GetIdLookupValues();
            return Ok(values);
        }
    }
}
