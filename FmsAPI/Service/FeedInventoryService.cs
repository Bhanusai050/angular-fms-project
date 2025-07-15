using FmsAPI.Data;
using FmsAPI.Interface;
using System.Collections.Generic;
using System.Linq;

namespace FmsAPI.Service
{
  public class FeedInventoryService : IFeedInventoryService
  {
    private readonly FarmManagementSystemEntities _context;

    public FeedInventoryService(FarmManagementSystemEntities context)
    {
      _context = context;
    }

    public IEnumerable<Feed_Inventory> GetAll()
    {
      return _context.Feed_Inventory.ToList();
    }

    public Feed_Inventory GetById(int id)
    {
      return _context.Feed_Inventory.FirstOrDefault(f => f.FeedID == id);
    }

    public void Add(Feed_Inventory feed)
    {
      _context.Feed_Inventory.Add(feed);
      _context.SaveChanges();
    }

    public void Update(int id, Feed_Inventory feed)
    {
      var existing = _context.Feed_Inventory.Find(id);
      if (existing != null)
      {
        existing.FeedTypeID = feed.FeedTypeID;
        existing.StockQuantity = feed.StockQuantity;
        existing.Unit = feed.Unit;
        existing.ExpiryDate = feed.ExpiryDate;

        _context.SaveChanges();
      }
    }

    public void Delete(int id)
    {
      var feed = _context.Feed_Inventory.Find(id);
      if (feed != null)
      {
        _context.Feed_Inventory.Remove(feed);
        _context.SaveChanges();
      }
    }

    // Extra method to get Feed Types from Lookup
    public IEnumerable<object> GetFeedTypes()
    {
      return _context.IdLookupValues
          .Where(v => v.IdLookupID == 13)  // 13 = FeedType
          .Select(v => new { v.IdValueID, v.ValueName })
          .ToList();
    }
  }
}
