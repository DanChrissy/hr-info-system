using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Employee> Employees { get; set; }
    public override int SaveChanges()
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is Employee employee)
            {
                if (entry.State == EntityState.Added)
                {
                    employee.CreatedAt = DateTime.UtcNow; 
                    employee.UpdatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    employee.UpdatedAt = DateTime.UtcNow;
                }
            }
        }

        return base.SaveChanges();
    }
    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries())
        {
            if (entry.Entity is Employee employee)
            {
                if (entry.State == EntityState.Added)
                {
                    employee.CreatedAt = DateTime.UtcNow;
                    employee.UpdatedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    employee.UpdatedAt = DateTime.UtcNow; 
                }
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}