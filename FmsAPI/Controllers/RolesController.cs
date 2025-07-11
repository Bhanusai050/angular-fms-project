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
    public class RolesController : ApiController
    {
        
        
            private readonly IRoleService _roleService;

            public RolesController(IRoleService roleService)
            {
                _roleService = roleService;
            }

            [HttpGet]
            [Route("GetRoles")]
            public IHttpActionResult GetRoles()
            {
                var roles = _roleService.GetRoles();
                return Ok(roles);
            }

        [HttpPost]
        [Route("PostRole")]
        public IHttpActionResult PostRole(Role role)
        {
            try
            {
                _roleService.AddRole(role);
                return Ok("Role added successfully.");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpDelete]
        [Route("DeleteRole/{id}")]
        public IHttpActionResult DeleteRole(int id)
        {
            bool result = _roleService.DeleteRole(id);
            if (!result)
            {
                return NotFound(); // 404
            }

            return Ok("Role deleted successfully."); // 200
        }



    }
}
