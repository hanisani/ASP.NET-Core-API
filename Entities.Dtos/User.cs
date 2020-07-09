using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class User
    { 
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        public string Password { get; set; }
    }
}
