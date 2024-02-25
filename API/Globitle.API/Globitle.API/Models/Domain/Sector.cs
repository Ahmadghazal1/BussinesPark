using System.Text.Json.Serialization;

namespace Globitle.API.Models.Domain
{
    public class Sector
    {
        public Guid SectorId { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<Company> Companies { get; set; }
    }
}
