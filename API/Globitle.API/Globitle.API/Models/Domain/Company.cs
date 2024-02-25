using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Globitle.API.Models.Domain
{
    public class Company 
    {
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public Guid SectorId { get; set; }
        [JsonIgnore]
        public Sector Sector { get; set; }
        public int Size { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public bool CreatedAccount { get; set; }

    }

}
