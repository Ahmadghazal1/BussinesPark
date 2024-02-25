using Globitle.API.Models.Domain;

namespace Globitle.API.Models.DTOs
{
    public class ComplaintDto
    {
        public Guid CompanyComplaintId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        public Guid CompanyId { get; set; }

        public Company Company { get; set; }
    }
}
