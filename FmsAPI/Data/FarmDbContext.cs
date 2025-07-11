
using System.Data.Entity;
using FmsAPI.Models;

namespace FmsAPI.Data
{
    public class FarmDbContext : DbContext
    {
        public FarmDbContext() : base("name=FarmDbConnection") { }

        public DbSet<User> Users { get; set; }
    }
}