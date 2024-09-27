using AuthenticationService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
namespace AuthenticationService
{
    public class AuthDbContext : IdentityDbContext<User>
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }
    }
}
