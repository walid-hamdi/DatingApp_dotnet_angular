using API.Data;
using API.DTO;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username.ToLower())) return BadRequest("Username is taken.");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

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
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var findUser = await _context.Users.SingleOrDefaultAsync((user) => user.UserName == loginDto.Username);
            if (findUser == null)
            {
                return Unauthorized("Invalid username.");
            }

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