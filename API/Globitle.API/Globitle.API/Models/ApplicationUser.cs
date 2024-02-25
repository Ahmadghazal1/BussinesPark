using Globitle.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace Globitle.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public Guid? CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
