namespace AuctionService.Tests.Unit;

public interface IAuctionControllerTests
{
    Task GetAllAuctions_WithNoParams_Returns10Auctions();
    Task GetAuctionById_WithValidGuid_ReturnsAuction();
    Task GetAuctionById_WithInvalidGuid_ReturnsNotFound();
    Task CreateAuction_WithValidCreateAuctionDto_ReturnsCreatedAtAction();
    Task CreateAuction_FailedSave_Returns400BadRequest();
    Task UpdateAuction_WithUpdateAuctionDto_ReturnsOkResponse();
    Task UpdateAuction_WithInvalidUser_Returns403Forbid();
    Task UpdateAuction_WithInvalidGuid_ReturnsNotFound();
    Task DeleteAuction_WithValidUser_ReturnsOkResponse();
    Task DeleteAuction_WithInvalidGuid_Returns404Response();
    Task DeleteAuction_WithInvalidUser_Returns403Response();
}
