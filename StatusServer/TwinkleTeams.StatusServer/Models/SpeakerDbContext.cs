using Microsoft.EntityFrameworkCore;

namespace TwinkleTeams.StatusServer.Models
{
    public class SpeakerDbContext : DbContext
    {
        public SpeakerDbContext(DbContextOptions options)
                   : base(options) { }

        public DbSet<Speaker> Speakers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
            optionsBuilder.UseSqlite("Data Source=speakers.db");
    }
}
