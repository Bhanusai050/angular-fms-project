using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    interface ICompanyService
    {
        List<Company> GetCompany();
        void AddCompany(Company company);
        bool DeleteCompany(int id);
    }
}
