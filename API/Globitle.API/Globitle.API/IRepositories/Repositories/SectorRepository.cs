using Globitle.API.Data;
using Globitle.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Globitle.API.IRepositories.Repositories
{

    public class SectorRepository : ISectorRepository
    {
        private readonly GlobitleDbContext dbContext;

        public SectorRepository(GlobitleDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Sector> CreateAsync(Sector sector)
        {
            await dbContext.Sectors.AddAsync(sector);
            await dbContext.SaveChangesAsync();
            return sector;
        }

        public async Task<Sector?> DeleteAsync(Guid id)
        {
            var findSector = await dbContext.Sectors.FirstOrDefaultAsync(x => x.SectorId == id);
            if (findSector == null)
                return null;
            dbContext.Sectors.Remove(findSector);
            await dbContext.SaveChangesAsync();
            return findSector;
        }

        public async Task<List<Sector>> GetAllAsync()
        {
            return await dbContext.Sectors.Include(x => x.Companies).ToListAsync();
        }

        public async Task<Sector?> GetByIdAsync(Guid id)
        {
            return await dbContext.Sectors.Include(x => x.Companies).FirstOrDefaultAsync(x => x.SectorId == id);
        }

        public async Task<Sector?> UpdateAsync(Guid id, Sector sector)
        {
            var findSector = await dbContext.Sectors.FirstOrDefaultAsync(x => x.SectorId == id);

            if (findSector == null)
            {
                return null;
            }
            findSector.Name = sector.Name;
            await dbContext.SaveChangesAsync();

            return findSector;
        }
    }
}
