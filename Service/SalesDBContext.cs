using Entities;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class SalesDBContext : DbContext
    {
        public SalesDBContext(DbContextOptions<SalesDBContext> dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Student> Student { get; set; }
        public DbSet<City> City { get; set; }
    }
}
