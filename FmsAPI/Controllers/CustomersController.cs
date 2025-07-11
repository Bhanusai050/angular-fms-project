// C# Web API Controller (CustomersController.cs)
using FmsAPI.Data;
using FmsAPI.Interface;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FmsAPI.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("api/customers")]
    public class CustomersController : ApiController
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/customers/all
        [HttpGet]
        [Route("all")]
        public IHttpActionResult GetCustomers()
        {
            var customers = _customerService.GetCustomers();
            return Ok(customers);
        }

        // POST: api/customers/add
        [HttpPost]
        [Route("add")]
        public IHttpActionResult AddCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _customerService.AddCustomer(customer);
            return Ok("Customer added successfully.");
        }

        // DELETE: api/customers/delete/5
        [HttpDelete]
        [Route("delete/{id}")]
        public IHttpActionResult DeleteCustomer(int id)
        {
            bool deleted = _customerService.DeleteCustomer(id);
            if (!deleted)
                return NotFound();

            return Ok("Customer deleted successfully.");
        }
    }
}