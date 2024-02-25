using Globitle.API.Models.DTOs;

namespace Globitle.API.Models
{
    public class AuthModel
    {
        public string Message { get; set; } 
        public bool IsAuthenticated { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public string Token { get; set; }
        public Guid? CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public DateTime ExpiresOn { get; set; }
    }
}
