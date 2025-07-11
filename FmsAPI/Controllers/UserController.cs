using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FmsAPI.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/users/register
        [HttpPost]
        [Route("register")]
        public async Task<IHttpActionResult> Register(User user)
        {
            var result = await _userService.RegisterAsync(user);
            return Ok(result);
        }

        // POST: api/users/login
        [HttpPost]
        [Route("login")]
        public async Task<IHttpActionResult> Login(LoginModel model)
        {
            var result = await _userService.LoginAsync(model.Email, model.Password);
            return Ok(result);
        }

        // POST: api/users/send-otp
        [HttpPost]
        [Route("send-otp")]
        public async Task<IHttpActionResult> SendOtp([FromBody] string email)
        {
            var result = await _userService.SendOtpAsync(email);
            return Ok(result);
        }
    }
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }



}

