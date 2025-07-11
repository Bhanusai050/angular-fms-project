using FmsAPI.Data;
using FmsAPI.Interface;
using System.Collections.Generic;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    [RoutePrefix("api/orders")]
    public class OrdersController : ApiController
    {
        private readonly IOrderService _service;

        public OrdersController(IOrderService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<Order> GetOrders()
        {
            return _service.GetOrders();
        }

        [HttpPost]
        [Route("add")]
        public IHttpActionResult AddOrder(Order order)
        {
            _service.AddOrder(order);
            return Ok("Order added successfully");
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IHttpActionResult DeleteOrder(int id)
        {
            var result = _service.DeleteOrder(id);
            if (result)
                return Ok("Order deleted successfully");
            return NotFound();
        }
    }
}
