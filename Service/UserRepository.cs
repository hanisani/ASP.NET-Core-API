using Contracts;
using Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SalesDBContext _salesDBContext;
        private readonly IConfiguration _configuration;
        public UserRepository(SalesDBContext salesDBContext, IConfiguration configuration)
        {
            _salesDBContext = salesDBContext;
            _configuration = configuration;
        }
        public IEnumerable<User> GetUsers()
        {
            return _salesDBContext.User.ToList();
        }
        public User GetUserByID(int userId)
        {
            return _salesDBContext.User.FirstOrDefault(x => x.Id == userId);
        }
        public int Register(User user)
        {
            _salesDBContext.User.Add(user);
            _salesDBContext.SaveChanges();
            return user.Id;
        }
        public User GetUserByEmail(string email)
        {
            return _salesDBContext.User.FirstOrDefault(x => x.Email == email);
        }
        public User GetUserByUsername(string username)
        {
            return _salesDBContext.User.FirstOrDefault(x => x.Username == username);
        }
        public User GetUserByUsernameAndPassword(string username, string password)
        {
            return _salesDBContext.User.FirstOrDefault(x => x.Username == username && x.Password == password);
        }
        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings")["Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("userId", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
