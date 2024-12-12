using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ReactWithASP.Server.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeeController: ControllerBase
    {
        private readonly AppDbContext _context;
        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpPost]
        [Authorize(Roles = Role.Admin)]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            var password =  $"{employee.PhoneNumber}.{employee.FirstName}";
            var hashedPassword = PasswordHasher.HashPassword(password);
            employee.Password = hashedPassword;
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id) {
                return BadRequest();
            }
            
            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                var emp = await _context.Employees.FindAsync(id);
                if (emp != null) {
                    _context.Entry(emp).Property(e => e.Password).IsModified = false;
                    _context.Entry(emp).Property(e => e.CreatedAt).IsModified = false;

                    await _context.SaveChangesAsync();
                }
                
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = Role.Admin)]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            var numOfAdmins = await _context.Employees.CountAsync(e => e.Role == Role.Admin);
            if (employee == null)
            {
                return NotFound();
            }

            if (employee.Role == Role.Admin && numOfAdmins == 1) {
                return StatusCode(500, "An error occurred while processing the request. At least one admin should be in the system");
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }


    }
}