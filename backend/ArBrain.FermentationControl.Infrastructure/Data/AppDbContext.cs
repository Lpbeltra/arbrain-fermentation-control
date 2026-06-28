using ArBrain.FermentationControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ArBrain.FermentationControl.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Beer> Beers { get; set; }
    public DbSet<Tank> Tanks { get; set; }
    public DbSet<FermentationRecord> FermentationRecords { get; set; }
}