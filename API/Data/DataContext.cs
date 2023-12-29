using System.Reflection;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

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

            builder.ApplyUtcDateTimeConverter();

        }

    }

    public class UtcValueConverter : ValueConverter<DateTime, DateTime>
    {
        public UtcValueConverter()
            : base(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc))
        {
        }
    }

    public static class UtcDateAnnotation
    {
        private const string IsUtcAnnotation = "IsUtc";

        public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, bool isUtc = true)
        {
            if (builder is null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            return builder.HasAnnotation(IsUtcAnnotation, isUtc);
        }

        public static bool IsUtc(this IMutableProperty property)
        {
            if (property is null)
            {
                throw new ArgumentNullException(nameof(property));
            }

            var attribute = property.PropertyInfo?.GetCustomAttribute<IsUtcAttribute>();
            if (attribute is not null && attribute.IsUtc)
            {
                return true;
            }

            return ((bool?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;
        }

        /// <summary>
        /// Make sure this is called after configuring all your entities.
        /// </summary>
        public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
        {
            if (builder is null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (!property.IsUtc())
                    {
                        continue;
                    }

                    if (property.ClrType == typeof(DateTime) ||
                        property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(typeof(UtcValueConverter));
                    }
                }
            }
        }
    }

    [AttributeUsage(AttributeTargets.Property)]
    public class IsUtcAttribute : Attribute
    {
        public IsUtcAttribute(bool isUtc = true) => this.IsUtc = isUtc;
        public bool IsUtc { get; }
    }
}