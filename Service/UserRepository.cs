using Contracts;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SalesDBContext _salesDBContext;
        public UserRepository(SalesDBContext salesDBContext)
        {
            _salesDBContext = salesDBContext;
        }
        public User GetUserByID(int cityId)
        {
            throw new NotImplementedException();
        }

        public int Register(User user)
        {
            _salesDBContext.User.Add(user);
            return 1;
        }
    }
}
