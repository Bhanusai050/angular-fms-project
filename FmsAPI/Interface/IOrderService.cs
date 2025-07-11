using FmsAPI.Data;
using System.Collections.Generic;

namespace FmsAPI.Interface
{
    public interface IOrderService
    {
        List<Order> GetOrders();
        void AddOrder(Order order);
        bool DeleteOrder(int id);
    }
}
