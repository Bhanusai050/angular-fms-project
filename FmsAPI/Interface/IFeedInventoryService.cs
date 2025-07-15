using FmsAPI.Data;
using System.Collections.Generic;

namespace FmsAPI.Interface
{
  public interface IFeedInventoryService
  {
    IEnumerable<Feed_Inventory> GetAll();
    Feed_Inventory GetById(int id);
    void Add(Feed_Inventory feed);
    void Update(int id, Feed_Inventory feed);
    void Delete(int id);

    // Extra method for dropdown
    IEnumerable<object> GetFeedTypes();
  }
}
