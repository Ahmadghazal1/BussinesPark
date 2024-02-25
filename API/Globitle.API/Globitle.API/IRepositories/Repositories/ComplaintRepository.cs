using Globitle.API.Data;
using Globitle.API.Models.Domain;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Globitle.API.IRepositories.Repositories
{
    public class ComplaintRepository : IComplaintRepository
    {
        private readonly GlobitleDbContext dbContext;

        public ComplaintRepository(GlobitleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<CompanyComplaint> CreateAsync(CompanyComplaint companyComplaint)
        {
            companyComplaint.CreatedAt = DateTime.Now;
            await dbContext.CompanyComplaints.AddAsync(companyComplaint);
            await dbContext.SaveChangesAsync();
            return companyComplaint;
        }
        public async Task<CompanyComplaint?> DeleteAsync(Guid id)
        {
            var findComplaint = await dbContext.CompanyComplaints.FirstOrDefaultAsync(x => x.CompanyComplaintId == id);
            if (findComplaint == null)
                return null;
            dbContext.CompanyComplaints.Remove(findComplaint);
            await dbContext.SaveChangesAsync();
            return findComplaint;
        }

        public async Task<List<CompanyComplaint>> GetAllAsync()
        {
            return await dbContext.CompanyComplaints.Include(x => x.Company).ToListAsync();
        }

        public async Task<CompanyComplaint?> GetByIdAsync(Guid id)
        {
            return await dbContext.CompanyComplaints.Include(x => x.Company).FirstOrDefaultAsync(x => x.CompanyComplaintId == id);
        }

        public async Task<CompanyComplaint?> UpdateAsync(Guid id, CompanyComplaint companyComplaint)
        {
            var findComplaint = await dbContext.CompanyComplaints.FirstOrDefaultAsync(x => x.CompanyComplaintId == id);

            if (findComplaint == null)
            {
                return null;
            }
            companyComplaint.Title = companyComplaint.Title;
            companyComplaint.Description = companyComplaint.Description;
            await dbContext.SaveChangesAsync();

            return findComplaint;
        }
    }
}
