using FmsAPI.Data;
using FmsAPI.Interface;
using FmsAPI.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class PasswordResetTokenController : ApiController
    {
        private readonly IPasswordResetTokenService _tokenService;

        public PasswordResetTokenController()
        {
            _tokenService = new PasswordResetTokenService();
        }

        [HttpGet]
        [Route("GetPasswordResetTokens")]
        public IHttpActionResult GetTokens()
        {
            var tokens = _tokenService.GetTokens();
            if (tokens == null || !tokens.Any())
                return NotFound();

            return Ok(tokens);
        }

        [HttpPost]
        [Route("PostPasswordResetToken")]
        public IHttpActionResult PostToken([FromBody] PasswordResetToken token)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _tokenService.AddToken(token);
            return Ok("Token added successfully.");
        }

        [HttpDelete]
        [Route("DeletePasswordResetToken/{id}")]
        public IHttpActionResult DeleteToken(int id)
        {
            var result = _tokenService.DeleteToken(id);
            if (!result)
                return NotFound();

            return Ok("Token deleted successfully.");
        }
    }
}
