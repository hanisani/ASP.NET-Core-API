using Entities;
using System.Collections.Generic;

namespace Contracts
{
    public interface ICityRepository
    {
        IEnumerable<City> GetCities();
        City GetCityByID(int cityId);
    }
}
