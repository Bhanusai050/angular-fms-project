using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    public class WorkersController : ApiController
    {
        private readonly IWorkerService _workerService;

        public WorkersController(IWorkerService workerService)
        {
            _workerService = workerService;
        }

        [HttpGet]
        [Route("GetWorkers")]
        public IHttpActionResult GetWorkers()
        {
            var workers = _workerService.GetWorkers();

           

            return Ok(workers);
        }


        [HttpPost]
        [Route("PostWorker")]
        public IHttpActionResult PostWorker(Worker worker)
        {
            if (worker == null)
                return BadRequest("Invalid data.");

            _workerService.AddWorker(worker);
            return Ok("Worker added successfully.");
        }




        [HttpDelete]
        [Route("DeleteWorker/{id}")]
        public IHttpActionResult DeleteWorker(int id)
        {
            var result = _workerService.DeleteWorker(id);
            if (!result)
                return NotFound();

            return Ok("Worker deleted successfully.");
        }
    }
}
