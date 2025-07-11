using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class VendorService : IVendorService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Vendor> GetVendors()
        {
            return context.Vendors.ToList();
        }
    }
}