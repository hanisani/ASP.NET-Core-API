using Contracts;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly SalesDBContext _salesDBContext;
        public StudentRepository(SalesDBContext salesDBContext)
        {
            _salesDBContext = salesDBContext;
        }
        public IEnumerable<Student> GetStudents()
        {
            return _salesDBContext.Student.ToList();
        }
        public Student GetStudentByID(int id)
        {
            return _salesDBContext.Student.Find(id);
        }
    }
}
