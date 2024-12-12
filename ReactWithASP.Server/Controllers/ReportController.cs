using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server;

[ApiController]
[Route("/api/reports")]
public class ReportController : ControllerBase
{
    private readonly AppDbContext _context;
    public ReportController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("count")]
    [Authorize(Roles = Role.Admin)]
    public async Task<ActionResult> GetTotalEmployees([FromQuery] string? role)
    {
        int employeesCount;
        if (role != null)
        {
            employeesCount = await _context.Employees.CountAsync(e => e.Role == role);
        }
        else
        {
            employeesCount = await _context.Employees.CountAsync();

        }


        return Ok(employeesCount);
    }

    [HttpGet("hires")]
    [Authorize(Roles = Role.Admin)]
    public async Task<ActionResult> GetRecentHires([FromQuery] int days)
    {
        DateOnly daysToDetermine = DateOnly.FromDateTime(DateTime.Today.AddDays(-days));
        var employeesCount = await _context.Employees.CountAsync(e => e.DateOfHire >= daysToDetermine);
        return Ok(employeesCount);
    }

}