using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class RoleService : IRoleService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Role> GetRoles()
        {
            return context.Roles.ToList();
        }
        public void AddRole(Role role)
        {
            context.Roles.Add(role);
            context.SaveChanges();
        }

        public bool DeleteRole(int roleId)
        {
            var role = context.Roles.Find(roleId);
            if (role != null)
            {
                context.Roles.Remove(role);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}