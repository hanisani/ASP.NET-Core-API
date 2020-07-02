using System.Linq;
using Contracts;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _CityRepository;
        public CityController(ICityRepository CityRepository)
        {
            _CityRepository = CityRepository;
        }
        [HttpGet("/api/[controller]/all")]
        public IActionResult Get()
        {
            var cities = _CityRepository.GetCities();
            if (cities.Count() == 0)
            {
                return NotFound("No city found");
            }
            return Ok(cities);
        }
        [HttpGet("/api/[controller]/one")]
        public IActionResult GetOne(int id)
        {
            var city = _CityRepository.GetCityByID(id);
            if (city == null)
            {
                return NotFound("No city found");
            }
            return Ok(city);
        }
    }
}