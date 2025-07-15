using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class PermissionService : IPermissionService
    {
    FarmManagementSystemEnities context = new FarmManagementSystemEnities();

        public List<Permission> GetPermissions()
        {
            return context.Permissions.ToList();

        }

        public void AddPermission(Permission permission)
        {
            context.Permissions.Add(permission);
            context.SaveChanges();
        }



        public void DeletePermission(int id)
        {
            var permission = context.Permissions.Find(id);
            if (permission != null)
            {
                context.Permissions.Remove(permission);
                context.SaveChanges();
            }
        }

    }
}
