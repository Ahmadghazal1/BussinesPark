using Globitle.API.Data;
using Globitle.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Globitle.API.IRepositories.Repositories
{
    public class SuggestionRepository : ISuggestionRepository
    {
        private readonly GlobitleDbContext dbContext;

        public SuggestionRepository(GlobitleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<ComplaintSuggestion> CreateAsync(ComplaintSuggestion complaintSuggestion)
        {
            complaintSuggestion.CreatedAt = DateTime.Now;
            await dbContext.ComplaintSuggestions.AddAsync(complaintSuggestion);
            await dbContext.SaveChangesAsync();
            return complaintSuggestion;
        }

        public async Task<ComplaintSuggestion?> DeleteAsync(Guid id)
        {
            var findSuggestion = await dbContext.ComplaintSuggestions.FirstOrDefaultAsync(x => x.ComplaintSuggestionId == id);
            if (findSuggestion == null)
                return null;
            dbContext.ComplaintSuggestions.Remove(findSuggestion);
            await dbContext.SaveChangesAsync();
            return findSuggestion;
        }

        public async Task<List<ComplaintSuggestion>> GetAllAsync()
        {
            return await dbContext.ComplaintSuggestions.Include(x => x.Company).ToListAsync();
        }

        public async Task<ComplaintSuggestion?> GetByIdAsync(Guid id)
        {
            return await dbContext.ComplaintSuggestions.Include(x => x.Company).FirstOrDefaultAsync(x => x.ComplaintSuggestionId == id);
        }

    }
}
