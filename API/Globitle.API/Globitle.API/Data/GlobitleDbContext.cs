using Globitle.API.Models;
using Globitle.API.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Globitle.API.Data
{
    public class GlobitleDbContext : IdentityDbContext<ApplicationUser>
    {
        public GlobitleDbContext(DbContextOptions<GlobitleDbContext> dbContextOptions) : base(dbContextOptions)
        {
            
        }
        public DbSet<Company> Companies { get; set; }
        public DbSet<ComplaintSuggestion> ComplaintSuggestions { get; set; }
        public DbSet<CompanyComplaint> CompanyComplaints { get; set; }
        public DbSet<Sector> Sectors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            

            modelBuilder.Entity<Company>()
                .HasOne(c => c.Sector)
                .WithMany(s => s.Companies)
                .HasForeignKey(c => c.SectorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ApplicationUser>().ToTable("AspNetUsers").HasKey(u => u.Id);
            modelBuilder.Entity<IdentityRole>().ToTable("AspNetRoles").HasKey(r => r.Id);
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("AspNetUserRoles").HasKey(r => new { r.UserId, r.RoleId });
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("AspNetUserClaims").HasKey(c => c.Id);
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("AspNetUserLogins").HasKey(l => new { l.LoginProvider, l.ProviderKey, l.UserId });
            modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("AspNetRoleClaims").HasKey(c => c.Id);
            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("AspNetUserTokens").HasKey(t => new { t.UserId, t.LoginProvider, t.Name });

            // can't delete sector if the sector have a companies 
        }
    }
}
