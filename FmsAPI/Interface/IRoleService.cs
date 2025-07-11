using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IRoleService
    {
        List<Role> GetRoles();
        void AddRole(Role role);
        bool DeleteRole(int roleId);
    }

}
