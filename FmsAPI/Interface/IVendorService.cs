using FmsAPI.Data;
using System.Collections.Generic;

namespace FmsAPI.Interface
{
  public interface IVendorService
  {
    List<Vendor> GetVendors();
    Vendor GetVendorById(int id);
    bool AddVendor(Vendor vendor);
    bool UpdateVendor(Vendor vendor);
    bool DeleteVendor(int id);
  }
}

