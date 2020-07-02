using System.Linq;
using Contracts;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _StudentRepository;
        public StudentController(IStudentRepository StudentRepository)
        {
            _StudentRepository = StudentRepository;
        }
        [HttpGet("/api/[controller]/all")]
        public IActionResult Get()
        {
            var students = _StudentRepository.GetStudents();
            if (students.Count() == 0)
            {
                return NotFound("No student found");
            }
            return Ok(students);
        }
        [HttpGet("/api/[controller]/one")]
        public IActionResult GetOne(int id)
        {
            var student = _StudentRepository.GetStudentByID(id);
            if (student == null)
            {
                return NotFound("No student found");
            }
            return Ok(student);
        }
    }
}