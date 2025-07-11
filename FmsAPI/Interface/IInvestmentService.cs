using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IInvestmentService
    {
        List<Investment> GetInvestments();
        void AddInvestment(Investment investment);
        bool DeleteInvestment(int id);
    }

}
