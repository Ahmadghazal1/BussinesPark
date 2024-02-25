using Globitle.API.Models.Domain;

namespace Globitle.API.Models.DTOs
{
    public class SectorDto
    {
        public Guid SectorId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Company> Companies { get; set; }
    }
}
