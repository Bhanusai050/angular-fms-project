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
    public class PermissionsController : ApiController
    {
        private readonly IPermissionService _permissionService;

        public PermissionsController(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        [HttpGet]
        [Route("GetPermissions")]
        public IHttpActionResult GetPermissions()
        {
            var permissions = _permissionService.GetPermissions();
            return Ok(permissions);
        }


        [HttpPost]
        [Route("PostPermission")]
        public IHttpActionResult AddPermission([FromBody] Permission permission)
        {
            if (permission == null || string.IsNullOrWhiteSpace(permission.PermissionName))
            {
                return BadRequest("Invalid permission data.");
            }

            _permissionService.AddPermission(permission);
            return Ok("Permission added successfully.");
        }



        [HttpDelete]
        [Route("DeletePermission/{id}")]
        public IHttpActionResult DeletePermission(int id)
        {
            _permissionService.DeletePermission(id);
            return Ok($"Permission with ID {id} deleted successfully.");
        }

    }
}
