using AutoMapper;
using Globitle.API.CustomActionFilters;
using Globitle.API.IRepositories;
using Globitle.API.Models.Domain;
using Globitle.API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Globitle.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectorController : ControllerBase
    {
        private readonly ISectorRepository sectorRepository;
        private readonly IMapper mapper;

        public SectorController(ISectorRepository sectorRepository ,IMapper mapper)
        {
            this.sectorRepository = sectorRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var SectorDomianModel = await sectorRepository.GetAllAsync();

            if (SectorDomianModel is null)
                return BadRequest();

            return Ok(mapper.Map<List<SectorDto>>(SectorDomianModel));
        }
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var SectorDomianModel = await sectorRepository.GetByIdAsync(id);

            if (SectorDomianModel is null)
                return NotFound();

            return Ok(mapper.Map<SectorDto>(SectorDomianModel));
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddSectorRequestDto addSectorRequestDto)
        {

            var sectorDomianModel = mapper.Map<Sector>(addSectorRequestDto);
         
            sectorDomianModel = await sectorRepository.CreateAsync(sectorDomianModel);
   
            var sectorDto = mapper.Map<SectorDto>(sectorDomianModel);

            return CreatedAtAction(nameof(GetById), new { id = sectorDto.SectorId }, sectorDto);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateSectorRequestDto updateSectorRequestDto)
        {
            var sectorDomianModel = mapper.Map<Sector>(updateSectorRequestDto);
            sectorDomianModel = await sectorRepository.UpdateAsync(id, sectorDomianModel);
            if (sectorDomianModel is null)
                return NotFound();
            return Ok(mapper.Map<SectorDto>(sectorDomianModel));

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var sectorDomianModel = await sectorRepository.DeleteAsync(id);

            if (sectorDomianModel is null)
                return NotFound();
            return Ok();
        }
    }
}
