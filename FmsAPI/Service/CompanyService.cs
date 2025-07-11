using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class CompanyService: ICompanyService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Company> GetCompany()
        {
            return context.Companies.ToList();
        }

        public void AddCompany(Company company)
        {
            context.Companies.Add(company);
            context.SaveChanges();
        }
        public bool DeleteCompany(int id)
        {
            var company = context.Companies.FirstOrDefault(c => c.CompanyID == id);
            if (company != null)
            {
                context.Companies.Remove(company);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}