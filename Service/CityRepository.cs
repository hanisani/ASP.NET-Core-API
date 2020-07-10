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

        public int Add(City city)
        {
            _salesDBContext.City.Add(city);
            _salesDBContext.SaveChanges();
            return city.Id;
        }

        public bool Delete(int cityId)
        {
            var result = _salesDBContext.City.FirstOrDefault(x => x.Id == cityId);
            if (result == null)
            {
                return false;
            }
            else
            {
                _salesDBContext.City.Remove(result);
                _salesDBContext.SaveChanges();
                return true;
            }
        }

        public IEnumerable<City> GetCities()
        {
            return _salesDBContext.City.ToList();
        }

        public City GetCityByID(int id)
        {
            return _salesDBContext.City.Find(id);
        }

        public City GetCityByNameAndCode(string name, string code)
        {
            return _salesDBContext.City.FirstOrDefault(x => x.Name == name && x.Code == code);
        }

        public bool Update(City city)
        {
            var result = _salesDBContext.City.Find(city.Id);
            if (result == null)
            {
                return false;
            } 
            else
            {
                result.Name = city.Name;
                result.Code = city.Code;
                _salesDBContext.SaveChanges();
                return true;
            }
        }
    }
}
