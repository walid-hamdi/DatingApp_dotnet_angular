using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;

        public AdminController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUserWithRoles()
        {
            var users = await _userManager.Users
            .Include(role => role.UserRoles)
            .ThenInclude(role => role.Role)
            .OrderBy(user => user.UserName)
            .Select(user => new
            {
                user.Id,
                Username = user.UserName,
                Roles = user.UserRoles.Select(role => role.Role.Name).ToList()
            }).ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photo-to-moderate")]
        public ActionResult GetPhotoForModeration()
        {
            return Ok("Admin or moderators can see this.");
        }
    }
}