using Entities;
using System.Collections.Generic;

namespace Contracts
{
    public interface IUserRepository
    {
        User GetUserByID(int cityId);
        int Register(User user);
    }
}
