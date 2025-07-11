using FmsAPI.Data;
using FmsAPI.Interface;
using FmsAPI.Models;
using FmsAPI.Service;
using System;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FmsAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api")]
    public class ContactMessagesController : ApiController
    {
        private readonly IContactMessageService _contactService;

        // Constructor for Dependency Injection
        public ContactMessagesController(IContactMessageService contactService)
        {
            _contactService = contactService;
        }

        // Parameterless constructor fallback
        public ContactMessagesController()
        {
            _contactService = new ContactMessageService();
        }

        [HttpGet]
        [Route("Getcontactmessages")]
        public async Task<IHttpActionResult> GetMessages()
        {
            var messages = await _contactService.GetAllMessagesAsync();
            return Ok(messages);
        }

        [HttpPost]
        [Route("Postcontactmessages")]
        public async Task<IHttpActionResult> PostMessage(ContactMessage contactMessage)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _contactService.AddMessageAsync(contactMessage);
                return Ok(new
                {
                    message = "Message submitted successfully",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
