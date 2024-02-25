using System.ComponentModel.DataAnnotations;

namespace Globitle.API.Models.DTOs
{
    public class AddSectorRequestDto
    {
        [Required(ErrorMessage = "The Name is required")]
        [MaxLength(30)]
        [MinLength(5)]
        public string Name { get; set; }
    }
}
