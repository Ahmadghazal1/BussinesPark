using Globitle.API.Models.Domain;

namespace Globitle.API.Models.DTOs
{
    public class AddCompanyRequestDto
    {
        public string Name { get; set; }
        public Guid SectorId { get; set; }
        public int Size { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
    }
}
