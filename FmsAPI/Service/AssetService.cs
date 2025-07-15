using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class AssetService: IAssetService
    {
    FarmManagementSystemEnities context = new FarmManagementSystemEnities();

        public List<Asset> GetAssets()
        {
            return context.Assets.ToList(); 
        }
    }
}
