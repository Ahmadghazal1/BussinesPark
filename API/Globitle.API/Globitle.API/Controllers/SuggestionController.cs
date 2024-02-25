using AutoMapper;
using Globitle.API.CustomActionFilters;
using Globitle.API.IRepositories;
using Globitle.API.Models.Domain;
using Globitle.API.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Globitle.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ISuggestionRepository suggestionRepository;

        public SuggestionController(IMapper mapper, ISuggestionRepository suggestionRepository)
        {
            this.mapper = mapper;
            this.suggestionRepository = suggestionRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var suggestionDomianModel = await suggestionRepository.GetAllAsync();

            if (suggestionDomianModel is null)
                return BadRequest();

            return Ok(mapper.Map<List<SuggestionDto>>(suggestionDomianModel));
        }
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var suggestionDomianModel = await suggestionRepository.GetByIdAsync(id);

            if (suggestionDomianModel is null)
                return NotFound();

            return Ok(mapper.Map<ComplaintDto>(suggestionDomianModel));
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddSuggestionRequestDto addSuggestionRequestDto)
        {

            var suggestionDomianModel = mapper.Map<ComplaintSuggestion>(addSuggestionRequestDto);

            suggestionDomianModel = await suggestionRepository.CreateAsync(suggestionDomianModel);

            var suggestionDto = mapper.Map<SuggestionDto>(suggestionDomianModel);

            return CreatedAtAction(nameof(GetById), new { id = suggestionDto.ComplaintSuggestionId }, suggestionDto);

        }
      
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var suggestionDomianModel = await suggestionRepository.DeleteAsync(id);

            if (suggestionDomianModel is null)
                return NotFound();
            return Ok();
        }
    }
}
