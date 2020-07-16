using System.Linq;
using Contracts;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private const int DefaultCount = 5;
        private readonly ICityRepository _CityRepository;

        public CityController(ICityRepository CityRepository)
        {
            _CityRepository = CityRepository;
        }

        [HttpGet("/api/[controller]/all")]
        public IActionResult Get([FromQuery] string searchText = "", [FromQuery] int pageNumber = 1, [FromQuery] int recordsPerPage = DefaultCount)
        {
            var cities = _CityRepository.GetCities(searchText, pageNumber, recordsPerPage);

            return Ok(cities);
        }

        [HttpGet("/api/[controller]/one")]
        public IActionResult GetOne([FromQuery] int id)
        {
            var city = _CityRepository.GetCityByID(id);
            if (city == null)
            {
                return NotFound("No city found");
            }
            return Ok(city);
        }

        [HttpPost("/api/[controller]/add")]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Add([FromBody] City city)
        {
            if (ModelState.IsValid)
            {
                var cityExists = _CityRepository.GetCityByNameAndCode(city.Name, city.Code);
                if (cityExists != null)
                {
                    return new ConflictResult();
                }
                else
                {
                    var result = _CityRepository.Add(city);
                    return Ok(result);
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut("/api/[controller]/update")]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Update([FromBody] City city)
        {
            if (ModelState.IsValid)
            {
                var cityExists = _CityRepository.GetCityByNameAndCode(city.Name, city.Code);
                if (cityExists != null && city.Id != cityExists.Id)
                {
                    return new ConflictResult();
                }
                else
                {
                    var result = _CityRepository.Update(city);
                    return Ok(result);
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("/api/[controller]/delete")]
        public IActionResult Delete([FromQuery] int id)
        {
            if (ModelState.IsValid)
            {
                var result = _CityRepository.Delete(id);
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}