using Contracts;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repositories
{
    public class CityRepository : ICityRepository
    {
        private readonly SalesDBContext _salesDBContext;
        public CityRepository(SalesDBContext salesDBContext)
        {
            _salesDBContext = salesDBContext;
        }
        public IEnumerable<City> GetCities()
        {
            return _salesDBContext.City.ToList();
        }
        public City GetCityByID(int id)
        {
            return _salesDBContext.City.Find(id);
        }
    }
}
