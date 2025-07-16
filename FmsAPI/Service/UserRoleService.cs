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
    FarmManagementSystemEnities context = new FarmManagementSystemEnities();

        public List<UserRole> GetUserRoles()
        {
            return context.UserRoles.ToList();
        }
    }
}
