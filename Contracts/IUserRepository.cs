using Entities;
using System.Collections.Generic;

namespace Contracts
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();
        User GetUserByID(int userId);
        User GetUserByEmail(string email);
        User GetUserByUsername(string username);
        User GetUserByUsernameAndPassword(string username, string password);
        int Register(User user);
        string GenerateJwtToken(User user);
    }
}
