using System.Linq;
using Contracts;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _UserRepository;
        
        public UserController(IUserRepository UserRepository)
        {
            _UserRepository = UserRepository;
        }
        
        [HttpGet("/api/[controller]/all")]
        public IActionResult Get()
        {
            var users = _UserRepository.GetUsers();
            if (users.Count() == 0)
            {
                return NotFound("No user found");
            }
            return Ok(users);
        }
        
        [HttpGet("/api/[controller]/one")]
        public IActionResult GetUser()
        {
            string userId = User.Claims.First(x => x.Type == "userId").Value;

            if (!string.IsNullOrEmpty(userId))
            {
                var result = _UserRepository.GetUserByID(int.Parse(userId));

                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("/api/[controller]/register")]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Register(User user)
        {
            if (ModelState.IsValid)
            {
                var emailExists = _UserRepository.GetUserByEmail(user.Email);
                var usernameExists = _UserRepository.GetUserByUsername(user.Username);
                if (emailExists != null || usernameExists != null)
                {
                    return new ConflictResult();
                }
                else
                {
                    var result = _UserRepository.Register(user);
                    return Ok(result);
                }
            }
            else
            {
                return BadRequest();
            }
        }
        
        [AllowAnonymous]
        [HttpPost("/api/[controller]/login")]
        public IActionResult Login(User user)
        {
            if (ModelState.IsValid)
            {
                var userExists = _UserRepository.GetUserByUsernameAndPassword(user.Username, user.Password);
                if (userExists != null)
                {
                    var token = _UserRepository.GenerateJwtToken(userExists);
                    return Ok(new { token });
                }
                else
                {
                    return NotFound("No user found");
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}