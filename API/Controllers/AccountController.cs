using API.Data;
using API.DTO;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService,
         IMapper mapper,
         SignInManager<AppUser> signInManager)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username.ToLower())) return BadRequest("Username is taken.");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.GenerateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender,
            };

        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(user => user.UserName == username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var findUser = await _userManager.Users.SingleOrDefaultAsync((user) =>
            user.UserName == loginDto.Username.ToLower());

            if (findUser == null)
            {
                return Unauthorized("Invalid username.");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(findUser, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = findUser.UserName,
                Token = _tokenService.GenerateToken(findUser),
                // PhotoUrl = findUser.Photos.FirstOrDefault(photo => photo.IsMain)?.Url,
                KnownAs = findUser.KnownAs,
                Gender = findUser.Gender,
            };
        }
    }
}