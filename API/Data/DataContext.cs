using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { set; get; }
        public DbSet<UserLike> Likes { set; get; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserLike>().HasKey(key => new { key.SourceUserId, key.LikeUserId });

            builder.Entity<UserLike>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.LikedUsers)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<UserLike>()
            .HasOne(s => s.LikeUser)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s => s.LikeUserId)
            .OnDelete(DeleteBehavior.NoAction);
        }

    }
}