using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class RolePermissionsController : ApiController
    {
        private readonly IRolePermissionService _rolePermissionService;

        public RolePermissionsController(IRolePermissionService rolePermissionService)
        {
            _rolePermissionService = rolePermissionService;
        }

        [HttpGet]
        [Route("GetRolePermissions")]
        public IHttpActionResult GetRolePermissions()
        {
            var rolePermissions = _rolePermissionService.GetRolePermissions();
            return Ok(rolePermissions);
        }
    }
}
