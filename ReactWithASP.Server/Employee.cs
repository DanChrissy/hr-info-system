using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace ReactWithASP.Server
{
    [Index(nameof(Email), IsUnique = true)]
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email {get; set;}
        [JsonIgnore]
        public string? Password {get; set;}
        public string PhoneNumber {get; set;}
        public string Role {get; set;} 
        public string Position { get; set; }
        public DateOnly DateOfHire {get; set;}
        public int Salary { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public static class Role
    {
        public const string Admin = "Admin";
        public const string Employee = "Employee";
    }
}