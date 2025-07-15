using FmsAPI.Interface;
using FmsAPI.Data;
using System.Collections.Generic;
using System.Linq;

namespace FmsAPI.Service
{
  public class VendorService : IVendorService
  {
    private readonly FarmManagementSystemEntities _context;

    public VendorService(FarmManagementSystemEntities context)
    {
      _context = context;
    }

    public List<Vendor> GetVendors()
    {
      return _context.Vendors.ToList();
    }

    public Vendor GetVendorById(int id)
    {
      return _context.Vendors.FirstOrDefault(v => v.VendorID == id);
    }

    public bool AddVendor(Vendor vendor)
    {
      _context.Vendors.Add(vendor);
      return _context.SaveChanges() > 0;
    }

    public bool UpdateVendor(Vendor vendor)
    {
      var existing = _context.Vendors.FirstOrDefault(v => v.VendorID == vendor.VendorID);
      if (existing == null) return false;

      existing.VendorName = vendor.VendorName;
      existing.Category = vendor.Category;
      existing.PhoneNumber = vendor.PhoneNumber;
      existing.Email = vendor.Email;
      existing.Location = vendor.Location;

      return _context.SaveChanges() > 0;
    }

    public bool DeleteVendor(int id)
    {
      var vendor = _context.Vendors.FirstOrDefault(v => v.VendorID == id);
      if (vendor == null) return false;

      _context.Vendors.Remove(vendor);
      return _context.SaveChanges() > 0;
    }
  }
}
