using ReactWithASP.Server;
public static class DbSeeder
{
    public static void Seed(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        context.Database.EnsureCreated();

        if (!context.Employees.Any())
        {

            var phoneNumber = "8761111111";
            var firstName = "Super";
            var password = PasswordHasher.HashPassword($"{phoneNumber}.{firstName}");
            context.Employees.Add(
                new Employee {
                    FirstName = firstName,
                    LastName = "Admin",
                    Email="super.admin@example.com",
                    Password=password,
                    PhoneNumber=phoneNumber,
                    Role=Role.Admin,
                    Position="Super User",
                    DateOfHire=DateOnly.FromDateTime(DateTime.Now),
                    Salary=0,
                    CreatedAt=DateTime.UtcNow,
                    UpdatedAt=DateTime.UtcNow,
                }
            );

            context.SaveChanges();
        }
    }
}
