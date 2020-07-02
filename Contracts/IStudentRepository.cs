using Entities;
using System.Collections.Generic;

namespace Contracts
{
    public interface IStudentRepository
    {
        IEnumerable<Student> GetStudents();
        Student GetStudentByID(int studentId);
    }
}
