using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IPermissionService
    {
        List<Permission> GetPermissions();
        void AddPermission(Permission permission);

        void DeletePermission(int id);

    }
}
