
using FmsAPI.Interface;
using FmsAPI.Data;
using System.Web.Http;

namespace FmsAPI.Controllers
{
  [RoutePrefix("api/vendor")]
  public class VendorController : ApiController
  {
    private readonly IVendorService _vendorService;

    public VendorController(IVendorService vendorService)
    {
      _vendorService = vendorService;
    }

    // GET: api/vendor/all
    [HttpGet]
    [Route("all")]
    public IHttpActionResult GetVendors()
    {
      var vendors = _vendorService.GetVendors();
      return Ok(vendors);
    }

    // GET: api/vendor/5
    [HttpGet]
    [Route("{id:int}")]
    public IHttpActionResult GetVendorById(int id)
    {
      var vendor = _vendorService.GetVendorById(id);
      if (vendor == null)
        return NotFound();
      return Ok(vendor);
    }

    // POST: api/vendor/add
    [HttpPost]
    [Route("add")]
    public IHttpActionResult AddVendor([FromBody] Vendor vendor)
    {
      if (vendor == null)
        return BadRequest("Invalid vendor data.");

      bool result = _vendorService.AddVendor(vendor);
      if (result)
        return Ok("Vendor added successfully.");
      else
        return BadRequest("Failed to add vendor.");
    }

    // PUT: api/vendor/update/5
    [HttpPut]
    [Route("update/{id:int}")]
    public IHttpActionResult UpdateVendor(int id, [FromBody] Vendor vendor)
    {
      if (vendor == null || vendor.VendorID != id)
        return BadRequest("Invalid vendor data.");

      bool result = _vendorService.UpdateVendor(vendor);
      if (result)
        return Ok("Vendor updated successfully.");
      else
        return NotFound();
    }

    // DELETE: api/vendor/delete/5
    [HttpDelete]
    [Route("delete/{id:int}")]
    public IHttpActionResult DeleteVendor(int id)
    {
      bool result = _vendorService.DeleteVendor(id);
      if (result)
        return Ok("Vendor deleted successfully.");
      else
        return NotFound();
    }
  }
}
