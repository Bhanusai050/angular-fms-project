using FmsAPI.Data;
using FmsAPI.Interface;
using System.Collections.Generic;
using System.Linq;

namespace FmsAPI.Service
{
  public class IdLookupService : IIdLookupService
  {
    private readonly FarmManagementSystemEnities _context;

    public IdLookupService(FarmManagementSystemEnities context)
    {
      _context = context;
    }

    public List<IdLookup> GetIdLookups()
    {
      return _context.IdLookups.ToList();
    }

    public IdLookup GetIdLookupById(int id)
    {
      return _context.IdLookups.FirstOrDefault(x => x.IdLookupID == id);
    }
  }
}
