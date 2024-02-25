using Globitle.API.Models.Domain;
using System.ComponentModel.DataAnnotations;

namespace Globitle.API.Models.DTOs
{
    public class AddComplaintRequestDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid CompanyId { get; set; }
    }
}
