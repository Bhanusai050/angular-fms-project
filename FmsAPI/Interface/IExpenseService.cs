using System.Collections.Generic;
using FmsAPI.Data;

namespace FmsAPI.Interface
{
  public interface IExpenseService
  {
    List<Expens> GetAll();
    Expens GetById(int id);
    void Add(Expens expense);
    void Update(Expens expense);
    void Delete(int id);
  }
}
