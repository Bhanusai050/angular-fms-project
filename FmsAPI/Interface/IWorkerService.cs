using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IWorkerService
    {
        List<Worker> GetWorkers();
        void AddWorker(Worker worker);
        bool DeleteWorker(int id);
    }
}
