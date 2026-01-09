using Microsoft.EntityFrameworkCore;
using DigitalAssets.Api.Models;

namespace DigitalAssets.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<DigitalAsset> DigitalAssets => Set<DigitalAsset>();
}
