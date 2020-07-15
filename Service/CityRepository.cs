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

        public IEnumerable<CityViewModel> GetCities(string searchText, int pageNumber, int recordsPerPage)
        {
            var skip = (pageNumber - 1) * recordsPerPage;

            if (string.IsNullOrEmpty(searchText))
            {
                return GetCitiesByPaging(skip, recordsPerPage);
            }
            else
            {
                return GetCitiesBySearchTextAndPaging(searchText, skip, recordsPerPage);
            }
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

        #region Other Methods
        public IEnumerable<CityViewModel> GetCitiesByPaging(int skip, int recordsPerPage)
        {
            var totalRecords = _salesDBContext.City.Count();

            var result = _salesDBContext.City.Skip(skip).Take(recordsPerPage).ToList();

            IEnumerable<CityViewModel> p = result.Select(x => new CityViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                Total = totalRecords
            });

            return p;
        }

        public IEnumerable<CityViewModel> GetCitiesBySearchTextAndPaging(string searchText, int skip, int recordsPerPage)
        {
            var totalRecords = _salesDBContext.City.Where(
                    x => x.Name.ToLower().Contains(searchText) ||
                    x.Code.ToLower().Contains(searchText)
                ).Count();

            var result = _salesDBContext.City.Where(
                x => x.Name.ToLower().Contains(searchText) ||
                x.Code.ToLower().Contains(searchText)
            ).Skip(skip).Take(recordsPerPage).ToList();

            IEnumerable<CityViewModel> p = result.Select(x => new CityViewModel
            {
                Id = x.Id,
                Name = x.Name,
                Code = x.Code,
                Total = totalRecords
            });

            return p;
        }
        #endregion
    }
}
