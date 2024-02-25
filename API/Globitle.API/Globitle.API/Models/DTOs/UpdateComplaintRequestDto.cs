using Globitle.API.Models.Domain;
using System.ComponentModel.DataAnnotations;

namespace Globitle.API.Models.DTOs
{
    public class UpdateComplaintRequestDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        // Foreign key for the related company
        public Guid CompanyId { get; set; }
    }
}
