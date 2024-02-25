using Globitle.API.Models.Domain;

namespace Globitle.API.Models.DTOs
{
    public class AddSuggestionRequestDto
    {
        public Guid ComplaintSuggestionId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public Guid CompanyId { get; set; }
    }
}
