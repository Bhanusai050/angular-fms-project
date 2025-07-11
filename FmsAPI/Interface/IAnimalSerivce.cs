using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IAnimalSerivce
    {
        List<Animal> GetAnimals();
        
        Animal AddAnimal(Animal animal);
        Animal UpdateAnimal(int id, Animal animal);
        bool DeleteAnimal(int id);


    }
}
