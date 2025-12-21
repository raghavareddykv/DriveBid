namespace AuctionService.Tests.Integration;

public interface IAuctionControllerTests : IAsyncLifetime
{
    Task GetAllAuctions_ShouldReturn3Auctions();
    Task GetAuctionById_WithValidId_ShouldReturnAuction();
    Task GetAuctionById_WithInvalidId_ShouldReturn404();
    Task GetAuctionById_WithInvalidGuid_ShouldReturn400();
    Task CreateAuction_WithNoAuth_ShouldReturn401();
    Task CreateAuction_WithAuth_ShouldReturn201();
    Task CreateAuction_WithInvalidCreateAuctionDto_ShouldReturn400();
    Task UpdateAuction_WithValidUpdateDtoAndUser_ShouldReturn200();
    Task UpdateAuction_WithValidUpdateDtoAndInvalidUser_ShouldReturn403();
}
