using CarShop.Helpers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CarShop.Entities
{
    public class CarShopContext : IdentityDbContext<User, Role, int>
    {
        public CarShopContext(DbContextOptions<CarShopContext> options) : base(options)
        {
            
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<CarShop> CarShops { get; set; }
        public DbSet<RentedData> RentedDatas { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {

            builder.Properties<DateOnly>()
                .HaveConversion<DateOnlyConverter>()
                .HaveColumnType("date");

            base.ConfigureConventions(builder);

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Role>()
                .HasData(
                    new Role { Id = 1, Name = "User", NormalizedName = "USER" },
                    new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
                );

            builder.Entity<Car>(item =>
            {
                item.Property(x => x.Name).HasColumnType("varchar(200)");
                item.Property(x => x.Price).HasPrecision(5, 2);
            });

            builder.Entity<RentedData>(item =>
            {
                item.Property(x => x.Price).HasPrecision(5, 2);
            });

            builder.Entity<CarShop>(item =>
            {
                item.Property(x => x.Name).HasColumnType("varchar(200)");
                item.HasData(new CarShop { Id = 1, Name = "Wojtek's Cars" });
            });

            builder.Entity<CarShop>().HasMany(x => x.Cars).WithOne(x => x.CarShop).HasForeignKey(x => x.CarShopId).OnDelete(DeleteBehavior.NoAction);
            builder.Entity<CarShop>().HasMany(x => x.RentedCars).WithOne(x => x.CarShop).HasForeignKey(x => x.CarShopId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<RentedData>().HasOne(x => x.User).WithMany(x => x.RentedInfo).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.NoAction);
        }

    }
}
