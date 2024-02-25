using Globitle.API.Models.Domain;

namespace Globitle.API.IRepositories
{
    public interface ISectorRepository
    {
        Task<List<Sector>> GetAllAsync();
        Task<Sector?> GetByIdAsync(Guid id);
        Task<Sector> CreateAsync(Sector sector);
        Task<Sector?> UpdateAsync(Guid id, Sector sector);
        Task<Sector?> DeleteAsync(Guid id);
    }
}
