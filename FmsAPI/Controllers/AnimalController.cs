using FmsAPI.Data;
using FmsAPI.Interface;
using System.Web.Http;

namespace FmsAPI.Controllers
{
    [RoutePrefix("api/animals")]
    public class AnimalController : ApiController
    {
        private readonly IAnimalSerivce _repo;

        public AnimalController(IAnimalSerivce repo)
        {
            _repo = repo;
        }

        public AnimalController()
        {
            _repo = new FmsAPI.Service.AnimalService(); // fallback if DI not used
        }

        // ✅ GET all
        [HttpGet]
        [Route("get")]
        public IHttpActionResult GetAnimals()
        {
            var result = _repo.GetAnimals();
            return Ok(result);
        }

        // ✅ POST
        [HttpPost]
        [Route("add")]
        public IHttpActionResult AddAnimal(Animal animal)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = _repo.AddAnimal(animal);
            return Created($"api/animals/{created.AnimalID}", created);
        }

        // ✅ PUT
        [HttpPut]
        [Route("update/{id:int}")]
        public IHttpActionResult UpdateAnimal(int id, Animal animal)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = _repo.UpdateAnimal(id, animal);
            if (updated == null)
                return NotFound();

            return Ok(updated);
        }

        // ✅ DELETE
        [HttpDelete]
        [Route("delete/{id:int}")]
        public IHttpActionResult DeleteAnimal(int id)
        {
            var deleted = _repo.DeleteAnimal(id);
            if (!deleted)
                return NotFound();

            return Ok("Deleted successfully");
        }
    }
}
