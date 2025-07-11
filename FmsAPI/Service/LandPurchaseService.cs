using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class LandPurchaseService: ILandPurchaseService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<LandPurchas> GetLandPurchases()
        {
            return context.LandPurchases.ToList();
        }

        public void AddLandPurchase(LandPurchas landPurchas)
        {
            context.LandPurchases.Add(landPurchas);
            context.SaveChanges();
        }


        public bool DeleteLandPurchas(int id)
        {
            var land = context.LandPurchases.Find(id);
            if (land == null)
            {
                return false;
            }

            context.LandPurchases.Remove(land);
            context.SaveChanges();
            return true;
        }

    }
}