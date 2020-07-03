using Entities;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class SalesDBContext : DbContext
    {
        public SalesDBContext(DbContextOptions<SalesDBContext> dbContextOptions) : base(dbContextOptions)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public DbSet<Student> Student { get; set; }
        public DbSet<City> City { get; set; }
    }
}
