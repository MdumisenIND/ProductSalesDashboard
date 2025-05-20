using Microsoft.EntityFrameworkCore;
using ProductSalesDashboard.API.Models;
using System.Collections.Generic;

namespace ProductSalesDashboard.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Sale> Sales { get; set; }
    }
}
