using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class AssetsController : ApiController
    {
        private readonly IAssetService _assetService;

        public AssetsController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet]
        [Route("GetAssets")]
        public IHttpActionResult GetAssets()
        {
            var assets = _assetService.GetAssets();

            

            return Ok(assets);
        }
    }
}
