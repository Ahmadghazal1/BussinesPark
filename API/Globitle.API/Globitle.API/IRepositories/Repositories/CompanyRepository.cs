using Globitle.API.Data;
using Globitle.API.Models.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Globitle.API.IRepositories.Repositories
{
    [Authorize(Roles ="Admin")]
    public class CompanyRepository : ICompanyRepository
    {
        private readonly GlobitleDbContext dbContext;

        public CompanyRepository(GlobitleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Company> CreateAsync(Company company)
        {
            company.CreatedAccount = false;
            await dbContext.Companies.AddAsync(company);
            await dbContext.SaveChangesAsync();

            return company;
        }

        public async Task<Company?> DeleteAsync(Guid id)
        {
            var findCompany = await dbContext.Companies.FirstOrDefaultAsync(x => x.CompanyId == id);
            if (findCompany == null)
                return null;
            dbContext.Companies.Remove(findCompany);
            await dbContext.SaveChangesAsync();
            return findCompany;
        }

        public async Task<List<Company>> GetAllAsync()
        {
            return await dbContext.Companies.Include("Sector").ToListAsync();
        }

        public async Task<Company?> GetByIdAsync(Guid id)
        {
            return await dbContext.Companies.Include("Sector").FirstOrDefaultAsync(x => x.CompanyId == id);
        }

        public async Task<Company?> UpdateAsync(Guid id, Company company)
        {
            var findCompany = await dbContext.Companies.FirstOrDefaultAsync(x => x.CompanyId == id);

            if (findCompany == null)
            {
                return null;
            }
            findCompany.Name = company.Name;
            findCompany.Size = company.Size;
            findCompany.SectorId = company.SectorId;
            findCompany.Address = company.Address;
            findCompany.MobileNumber = company.MobileNumber;
            findCompany.Description = company.Description;
            findCompany.Email = company.Email;
            await dbContext.SaveChangesAsync();

            return findCompany;
        }


    }
}
