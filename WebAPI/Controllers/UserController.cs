using System.Linq;
using Contracts;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _UserRepository;
        public UserController(IUserRepository UserRepository)
        {
            _UserRepository = UserRepository;
        }
        [HttpPost("/api/[controller]/register")]
        public IActionResult Get(User user)
        {
            var result = _UserRepository.Register(user);
            return Ok(result);
        }
    }
}