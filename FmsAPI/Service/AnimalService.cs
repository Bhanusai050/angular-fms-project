using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class AnimalService : IAnimalSerivce
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<Animal> GetAnimals()
        {
            return context.Animals.ToList();
        }

        

        public Animal AddAnimal(Animal animal)
        {
            context.Animals.Add(animal);
            context.SaveChanges();
            return animal;
        }

        public Animal UpdateAnimal(int id, Animal updated)
        {
            var existing = context.Animals.Find(id);
            if (existing == null) return null;

            // Update properties
            existing.AnimalTypeID = updated.AnimalTypeID;
            existing.AnimalName = updated.AnimalName;
            existing.BirthDate = updated.BirthDate;
            existing.GenderID = updated.GenderID;
            existing.HealthStatusID = updated.HealthStatusID;
            existing.AnimalCost = updated.AnimalCost;
            existing.VendorID = updated.VendorID;
            existing.AnimalStatusID = updated.AnimalStatusID;
            existing.AnimalPurchasedDate = updated.AnimalPurchasedDate;
            existing.BatchID = updated.BatchID;

            context.SaveChanges();
            return existing;
        }

        public bool DeleteAnimal(int id)
        {
            var animal = context.Animals.Find(id);
            if (animal == null) return false;

            context.Animals.Remove(animal);
            context.SaveChanges();
            return true;
        }
    }
       
}