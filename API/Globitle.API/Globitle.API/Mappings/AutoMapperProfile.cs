using AutoMapper;
using Globitle.API.Models.Domain;
using Globitle.API.Models.DTOs;

namespace Globitle.API.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Mapping Sector
            CreateMap<Sector, SectorDto>().ReverseMap();
            CreateMap<AddSectorRequestDto, Sector>().ReverseMap();
            CreateMap<UpdateSectorRequestDto, Sector>().ReverseMap();

            //Mapping Company
            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<AddCompanyRequestDto, Company>().ReverseMap();
            CreateMap<UpdateCompanyRequestDto, Company>().ReverseMap();


            CreateMap<CompanyComplaint, ComplaintDto>().ReverseMap();
            CreateMap<AddComplaintRequestDto, CompanyComplaint>().ReverseMap();
            CreateMap<UpdateComplaintRequestDto, CompanyComplaint>().ReverseMap();

            CreateMap<ComplaintSuggestion, SuggestionDto>().ReverseMap();
            CreateMap<AddSuggestionRequestDto, ComplaintSuggestion>().ReverseMap();
           // CreateMap<UpdateSectorRequestDto, Sector>().ReverseMap();


        }
    }
}
