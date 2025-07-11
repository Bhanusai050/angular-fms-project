using FmsAPI.Data;
using FmsAPI.Interface;
using System.Collections.Generic;
using System.Linq;

namespace FmsAPI.Service
{
    public class OrderService : IOrderService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Order> GetOrders()
        {
            return context.Orders.ToList();
        }

        public void AddOrder(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
        }

        public bool DeleteOrder(int id)
        {
            var order = context.Orders.FirstOrDefault(o => o.OrderID == id);
            if (order != null)
            {
                context.Orders.Remove(order);
                context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
