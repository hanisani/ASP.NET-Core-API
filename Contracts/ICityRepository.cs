using Entities;
using System.Collections.Generic;

namespace Contracts
{
    public interface ICityRepository
    {
        IEnumerable<CityViewModel> GetCities(string searchText, int pageNumber, int recordsPerPage);        
        City GetCityByID(int cityId);
        City GetCityByNameAndCode(string name, string code);
        int Add(City city);
        bool Update(City city);
        bool Delete(int cityId);
    }
}
