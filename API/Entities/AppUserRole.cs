using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUserRole : IdentityUser<int>
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}