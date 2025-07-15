using FmsAPI.Data;
using FmsAPI.Interface;
using System.Linq;
using System.Web.Http;

namespace FmsAPI.Controllers
{
  [RoutePrefix("api/feedinventory")]
  public class FeedInventoryController : ApiController
  {
    private readonly IFeedInventoryService _service;

    public FeedInventoryController(IFeedInventoryService service)
    {
      _service = service;
    }

    // Get all Feed Inventory
    [HttpGet]
    [Route("")]
    public IHttpActionResult GetAll()
    {
      var data = _service.GetAll();
      return Ok(data);
    }

    // Get Feed Inventory by ID
    [HttpGet]
    [Route("{id:int}")]
    public IHttpActionResult GetById(int id)
    {
      var feed = _service.GetById(id);
      if (feed == null)
        return NotFound();

      return Ok(feed);
    }

    // Add new Feed Inventory
    [HttpPost]
    [Route("")]
    public IHttpActionResult Add([FromBody] Feed_Inventory feed)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      _service.Add(feed);
      return Ok();
    }

    // Update existing Feed Inventory
    [HttpPut]
    [Route("{id:int}")]
    public IHttpActionResult Update(int id, [FromBody] Feed_Inventory feed)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      _service.Update(id, feed);
      return Ok();
    }

    // Delete Feed Inventory by ID
    [HttpDelete]
    [Route("{id:int}")]
    public IHttpActionResult Delete(int id)
    {
      _service.Delete(id);
      return Ok();
    }

    // Get Feed Types for Dropdown (IdLookupID = 13)
    [HttpGet]
    [Route("feedtypes")]
    public IHttpActionResult GetFeedTypes()
    {
      using (var db = new FarmManagementSystemEnities())
      {
        var feedTypes = db.IdLookupValues
          .Where(v => v.IdLookupID == 13)
          .Select(v => new { v.IdValueID, v.ValueName })
          .ToList();

        return Ok(feedTypes);
      }
    }
  }
}
