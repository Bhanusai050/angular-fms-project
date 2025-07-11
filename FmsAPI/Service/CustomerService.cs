using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class CustomerService: ICustomerService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Customer> GetCustomers()
        {
            return context.Customers.ToList(); 
        }

        public void AddCustomer(Customer customer)
        {
            customer.CreatedAt = DateTime.Now;
            context.Customers.Add(customer);
            context.SaveChanges();
        }

        public bool DeleteCustomer(int id)
        {
            var cust = context.Customers.Find(id);
            if (cust == null)
                return false;

            context.Customers.Remove(cust);
            context.SaveChanges();
            return true;
        }
    }
}