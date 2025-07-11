using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface ILandPurchaseService
    {
        List<LandPurchas> GetLandPurchases();
        void AddLandPurchase(LandPurchas landPurchas);

        bool DeleteLandPurchas(int id);

    }


}
