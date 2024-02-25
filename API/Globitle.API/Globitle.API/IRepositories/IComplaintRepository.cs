using Globitle.API.Models.Domain;

namespace Globitle.API.IRepositories
{
    public interface IComplaintRepository
    {
        Task<List<CompanyComplaint>> GetAllAsync();
        Task<CompanyComplaint?> GetByIdAsync(Guid id);
        Task<CompanyComplaint> CreateAsync(CompanyComplaint companyComplaint);
        Task<CompanyComplaint?> UpdateAsync(Guid id, CompanyComplaint companyComplaint);
        Task<CompanyComplaint?> DeleteAsync(Guid id);
    }
}
