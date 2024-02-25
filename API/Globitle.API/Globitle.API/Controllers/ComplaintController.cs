using AutoMapper;
using Globitle.API.CustomActionFilters;
using Globitle.API.IRepositories;
using Globitle.API.Models.Domain;
using Globitle.API.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Globitle.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IComplaintRepository complaintRepository;

        public ComplaintController(IMapper mapper , IComplaintRepository complaintRepository)
        {
            this.mapper = mapper;
            this.complaintRepository = complaintRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var complaintDomianModel = await complaintRepository.GetAllAsync();

            if (complaintDomianModel is null)
                return BadRequest();

            return Ok(mapper.Map<List<ComplaintDto>>(complaintDomianModel));
        }
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var complaintDomianModel = await complaintRepository.GetByIdAsync(id);

            if (complaintDomianModel is null)
                return NotFound();

            return Ok(mapper.Map<ComplaintDto>(complaintDomianModel));
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddComplaintRequestDto addComplaintRequestDto)
        {

            var complaintDomianModel = mapper.Map<CompanyComplaint>(addComplaintRequestDto);

            complaintDomianModel = await complaintRepository.CreateAsync(complaintDomianModel);

            var complaintDto = mapper.Map<ComplaintDto>(complaintDomianModel);

            return CreatedAtAction(nameof(GetById), new { id = complaintDto.CompanyComplaintId }, complaintDto);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateComplaintRequestDto updateComplaintRequestDto)
        {
            var complaintDomianModel = mapper.Map<CompanyComplaint>(updateComplaintRequestDto);
            complaintDomianModel = await complaintRepository.UpdateAsync(id, complaintDomianModel);
            if (complaintDomianModel is null)
                return NotFound();
            return Ok(mapper.Map<ComplaintDto>(complaintDomianModel));
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var complaintDomianModel = await complaintRepository.DeleteAsync(id);

            if (complaintDomianModel is null)
                return NotFound();
            return Ok();
        }
    }
}
