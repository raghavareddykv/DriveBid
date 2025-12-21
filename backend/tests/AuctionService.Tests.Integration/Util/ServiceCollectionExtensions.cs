using AuctionService.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionService.Tests.Integration.Util;

public static class ServiceCollectionExtensions
{
    extension(IServiceCollection services)
    {
        public void RemoveDbContext<T>()
            where T : AuctionDbContext
        {
            var descriptor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<T>)
            );

            if (descriptor != null)
                services.Remove(descriptor);
        }

        public void EnsureCreated<T>()
            where T : AuctionDbContext
        {
            var sp = services.BuildServiceProvider();

            using var scope = sp.CreateScope();
            var scopedServices = scope.ServiceProvider;
            var db = scopedServices.GetRequiredService<T>();

            db.Database.Migrate();

            DbHelper.InitDbForTests(db);
        }
    }
}
