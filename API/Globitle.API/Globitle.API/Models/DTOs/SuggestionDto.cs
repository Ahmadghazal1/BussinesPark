using Globitle.API.Models.Domain;

namespace Globitle.API.Models.DTOs
{
    public class SuggestionDto
    {
        public Guid ComplaintSuggestionId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        // Foreign key for the related company
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
