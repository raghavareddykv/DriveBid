namespace AuctionService.Tests.Integration;

public interface IAuctionBusTests : IAsyncLifetime
{
    Task CreateAuction_WithValidObject_ShouldPublishAuctionCreated();
}
