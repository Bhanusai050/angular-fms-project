using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class UserRolesController : ApiController
    {
        private readonly IUserRoleService _userRoleService;

        public UserRolesController(IUserRoleService userRoleService)
        {
            _userRoleService = userRoleService;
        }

        [HttpGet]
        [Route("GetUserRoles")]
        public IHttpActionResult GetUserRoles()
        {
            var userRoles = _userRoleService.GetUserRoles();
            return Ok(userRoles);
        }
    }
}
