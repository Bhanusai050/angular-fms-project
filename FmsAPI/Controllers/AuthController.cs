using System.Linq;
using System.Web.Http;
using FmsAPI.Models;
using FmsAPI.Data;

namespace FmsAPI.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private readonly FarmDbContext db = new FarmDbContext();

        //[HttpPost]
        //[Route("signup")]
        //public IHttpActionResult Signup(UserSignupModel model)
        //{
        //    if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
        //        return BadRequest("Username and Password are required");

        //    if (db.Users.Any(u => u.Username == model.Username))
        //        return BadRequest("Username already exists");

        //    var user = new User
        //    {
        //        Username = model.Username,
        //        PasswordHash = model.Password // hash later
        //    };

        //    db.Users.Add(user);
        //    db.SaveChanges();

        //    return Ok("User registered successfully");
        //}
    }
}
