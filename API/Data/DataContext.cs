using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser,
    AppRole,
    int,
     IdentityUserClaim<int>,
     AppUserRole,
    IdentityUserLogin<int>,
    IdentityRoleClaim<int>,
    IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<UserLike> Likes { set; get; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Group> Groups { set; get; }
        public DbSet<Connection> Connections { set; get; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
            .HasMany(userRole => userRole.UserRoles)
            .WithOne(user => user.User)
            .HasForeignKey(userRole => userRole.UserId)
            .IsRequired();

            builder.Entity<AppRole>()
            .HasMany(userRole => userRole.UserRoles)
            .WithOne(user => user.Role)
            .HasForeignKey(userRole => userRole.RoleId)
            .IsRequired();

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

            builder.Entity<Message>()
            .HasOne(user => user.Recipient)
            .WithMany(message => message.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                        .HasOne(user => user.Sender)
                        .WithMany(message => message.MessagesSent)
                        .OnDelete(DeleteBehavior.Restrict);

        }

    }
}