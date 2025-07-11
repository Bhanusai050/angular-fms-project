using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class WorkerService: IWorkerService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Worker> GetWorkers()
        {
            return context.Workers.ToList(); 
        }


        public void AddWorker(Worker worker)
        {
            context.Workers.Add(worker);
            context.SaveChanges();
        }

        public bool DeleteWorker(int id)
        {
            var worker = context.Workers.Find(id);
            if (worker == null) return false;

            context.Workers.Remove(worker);
            context.SaveChanges();
            return true;
        }

    }
}