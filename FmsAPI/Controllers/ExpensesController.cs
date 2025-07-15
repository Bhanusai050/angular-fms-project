using System.Web.Http;
using FmsAPI.Data;
using FmsAPI.Interface;

namespace FmsAPI.Controllers
{
  [RoutePrefix("api/expenses")]
  public class ExpensesController : ApiController
  {
    private readonly IExpenseService _service;

    public ExpensesController(IExpenseService service)
    {
      _service = service;
    }

    [HttpGet]
    [Route("getall")]
    public IHttpActionResult GetAll()
    {
      return Ok(_service.GetAll());
    }

    [HttpGet]
    [Route("get/{id:int}")]
    public IHttpActionResult Get(int id)
    {
      var result = _service.GetById(id);
      if (result == null) return NotFound();
      return Ok(result);
    }

    [HttpPost]
    [Route("add")]
    public IHttpActionResult Add([FromBody] Expens expense)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      _service.Add(expense);
      return Ok("Expense added successfully");
    }

    [HttpPut]
    [Route("update")]
    public IHttpActionResult Update([FromBody] Expens expense)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      _service.Update(expense);
      return Ok("Expense updated successfully");
    }

    [HttpDelete]
    [Route("delete/{id:int}")]
    public IHttpActionResult Delete(int id)
    {
      _service.Delete(id);
      return Ok("Expense deleted successfully");
    }
  }
}
