using FmsAPI.Data;
using FmsAPI.Interface;
using System.Web.Http;

namespace FmsAPI.Controllers
{
  [RoutePrefix("api/animalbatch")]
  public class AnimalBatchController : ApiController
  {
    private readonly IAnimalBatchService _service;

    public AnimalBatchController(IAnimalBatchService service)
    {
      _service = service;
    }

    [HttpGet]
    [Route("")]
    public IHttpActionResult GetAll()
    {
      var data = _service.GetAll();
      return Ok(data);
    }

    [HttpGet]
    [Route("{id:int}")]
    public IHttpActionResult GetById(int id)
    {
      var item = _service.GetById(id);
      if (item == null) return NotFound();
      return Ok(item);
    }

    [HttpPost]
    [Route("")]
    public IHttpActionResult Add([FromBody] AnimalBatch batch)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      _service.Add(batch);
      return Ok();
    }

    [HttpPut]
    [Route("{id:int}")]
    public IHttpActionResult Update(int id, [FromBody] AnimalBatch batch)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      _service.Update(id, batch);
      return Ok();
    }

    [HttpDelete]
    [Route("{id:int}")]
    public IHttpActionResult Delete(int id)
    {
      _service.Delete(id);
      return Ok();
    }
  }
}

