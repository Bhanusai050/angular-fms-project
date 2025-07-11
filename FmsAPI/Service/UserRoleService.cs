using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class UserRoleService: IUserRoleService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<UserRole> GetUserRoles()
        {
            return context.UserRoles.ToList();
        }
    }
}