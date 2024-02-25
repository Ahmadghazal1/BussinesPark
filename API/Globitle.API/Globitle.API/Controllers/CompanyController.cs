using AutoMapper;
using Globitle.API.CustomActionFilters;
using Globitle.API.IRepositories;
using Globitle.API.IRepositories.Repositories;
using Globitle.API.Models;
using Globitle.API.Models.Domain;
using Globitle.API.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Globitle.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository companyRepository;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        public CompanyController(ICompanyRepository companyRepository , IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            this.companyRepository = companyRepository;
            this.mapper = mapper;
            this.userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var CompanyDomianModel = await companyRepository.GetAllAsync();

            if (CompanyDomianModel is null)

                return BadRequest();

            foreach (var company in CompanyDomianModel)
            {
                if (await userManager.FindByEmailAsync(company.Email) is not null)
                {
                    company.CreatedAccount = true;
                }
            }
                return Ok(mapper.Map<List<CompanyDto>>(CompanyDomianModel));
        }
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var CompanyDomianModel = await companyRepository.GetByIdAsync(id);

            if (CompanyDomianModel is null)
                return NotFound();

            return Ok(mapper.Map<CompanyDto>(CompanyDomianModel));
        }
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddCompanyRequestDto addCompanyRequestDto)
        {

            var CompanyDomianModel = mapper.Map<Company>(addCompanyRequestDto);

            CompanyDomianModel = await companyRepository.CreateAsync(CompanyDomianModel);

            var companyDto = mapper.Map<CompanyDto>(CompanyDomianModel);

            return CreatedAtAction(nameof(GetById), new { id = companyDto.CompanyId }, companyDto);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateCompanyRequestDto updateCompanyRequestDto)
        {
            var CompanyDomianModel = mapper.Map<Company>(updateCompanyRequestDto);
            CompanyDomianModel = await companyRepository.UpdateAsync(id, CompanyDomianModel);
            if (CompanyDomianModel is null)
                return NotFound();
            return Ok(mapper.Map<CompanyDto>(CompanyDomianModel));

        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var CompanyDomianModel = await companyRepository.DeleteAsync(id);

            if (CompanyDomianModel is null)
                return NotFound();
            return Ok();
        }

    }
}
