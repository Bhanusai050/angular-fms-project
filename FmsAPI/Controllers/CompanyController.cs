using FmsAPI.Data;
using FmsAPI.Interface;
using FmsAPI.Service;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class CompanyController : ApiController
    {
        private readonly ICompanyService _companyService;

        public CompanyController()
        {
            _companyService = new CompanyService();
        }

        // GET API
        [HttpGet]
        [Route("GetCompany")]
        public IHttpActionResult GetCompany()
        {
            var companies = _companyService.GetCompany();

            if (companies == null || !companies.Any())
            {
                return NotFound();
            }

            return Ok(companies);
        }

        // POST API
        [HttpPost]
        [Route("PostCompany")]
        public IHttpActionResult PostCompany([FromBody] Company company)
        {
            if (company == null)
            {
                return BadRequest("Invalid company data.");
            }

            _companyService.AddCompany(company);
            return Ok("Company added successfully");
        }

        // DELETE API
        [HttpDelete]
        [Route("DeleteCompany/{id}")]
        public IHttpActionResult DeleteCompany(int id)
        {
            bool deleted = _companyService.DeleteCompany(id);

            if (!deleted)
                return NotFound();

            return Ok("Company deleted successfully.");
        }
    }
}

