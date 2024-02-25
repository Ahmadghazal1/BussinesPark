namespace Globitle.API.Models.Domain
{
    public class CompanyComplaint
    {
        public Guid CompanyComplaintId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        // Foreign key for the related company
        public Guid CompanyId { get; set; }

        public Company Company { get; set; }
    }
}
