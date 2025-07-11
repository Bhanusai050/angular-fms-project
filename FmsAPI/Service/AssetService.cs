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
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Asset> GetAssets()
        {
            return context.Assets.ToList(); 
        }
    }
}