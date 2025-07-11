using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IFeedConsumptionService
    {
        List<Feed_Consumption> GetFeedConsumptions();
    }
}
