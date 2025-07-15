using FmsAPI.Data;
using System.Collections.Generic;

namespace FmsAPI.Interface
{
  public interface IAnimalBatchService
  {
    IEnumerable<AnimalBatch> GetAll();
    AnimalBatch GetById(int id);
    void Add(AnimalBatch batch);
    void Update(int id, AnimalBatch batch);
    void Delete(int id);
  }
}
