using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    // public class DataContext : DbContext
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity>? Activities { get; set; }

        public DbSet<ActivityAttendee>? ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.ActivityId, aa.AppUserId }));

            builder.Entity<ActivityAttendee>()
            .HasOne(x => x.AppUser)
            .WithMany(y => y.Activities)
            .HasForeignKey(w => w.AppUserId);

            builder.Entity<ActivityAttendee>()
            .HasOne(x => x.Activity)
            .WithMany(y => y.Attendees)
            .HasForeignKey(w => w.ActivityId);
        }

    }
}
