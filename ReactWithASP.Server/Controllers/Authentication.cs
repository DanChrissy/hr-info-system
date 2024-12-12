using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly JwtTokenService _tokenService;
    private readonly AppDbContext _context; 
    public AuthController(JwtTokenService tokenService, AppDbContext context)
    {
        _tokenService = tokenService;
        _context = context;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _context.Employees.FirstOrDefaultAsync(employee => employee.Email == request.Email);
        if (user == null){
            return NotFound();
        }
        if (request.Email == user.Email && PasswordHasher.ValidatePassword(request.Password, user.Password))
        {
            var token = _tokenService.GenerateToken(user.Email, user.Role, user.Id);
            return Ok(new { Token = token });
        }

        return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("validToken")]
    public async Task<IActionResult> ValidToken([FromBody] TokenRequest token)
    {
        var isValid = _tokenService.IsTokenValid(token.Token);
        if (isValid) {
            return Ok();
        }
        return Unauthorized();
    }
}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class TokenRequest {
    public string Token { get; set; }
}