using Globitle.API.Models.Domain;

namespace Globitle.API.IRepositories
{
    public interface ISuggestionRepository
    {
        Task<List<ComplaintSuggestion>> GetAllAsync();
        Task<ComplaintSuggestion?> GetByIdAsync(Guid id);
        Task<ComplaintSuggestion> CreateAsync(ComplaintSuggestion complaintSuggestion);
        Task<ComplaintSuggestion?> DeleteAsync(Guid id);
    }
}
