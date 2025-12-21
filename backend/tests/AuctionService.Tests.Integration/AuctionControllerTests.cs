using System.Net;
using System.Net.Http.Json;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AuctionService.Tests.Integration.Fixtures;
using AuctionService.Tests.Integration.Util;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionService.Tests.Integration;

[Collection("Shared collection")]
public class AuctionControllerTests(CustomWebAppFactory factory) : IAuctionControllerTests
{
    private readonly HttpClient _httpClient = factory.CreateClient();

    public Task InitializeAsync() => Task.CompletedTask;

    [Fact]
    public async Task GetAllAuctions_ShouldReturn3Auctions()
    {
        // arrange?

        // act
        var response = await _httpClient.GetFromJsonAsync<List<AuctionDto>>("/api/auctions");

        // assert
        Assert.Equal(3, response.Count);
    }

    [Fact]
    public async Task GetAuctionById_WithValidId_ShouldReturnAuction()
    {
        // arrange
        var auction = new Auction
        {
            Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
            Status = Status.Live,
            ReservePrice = 20000,
            Seller = "bob",
            AuctionEnd = DateTime.UtcNow.AddDays(10),
            Item = new Item
            {
                Make = "Ford",
                Model = "GT",
                Color = "White",
                Mileage = 50000,
                Year = 2020,
                ImageUrl = "https://cdn.pixabay.com/photo/2016/05/06/16/32/car-1376190_960_720.jpg",
            },
        };

        // act
        var response = await _httpClient.GetFromJsonAsync<AuctionDto>(
            $"/api/auctions/{auction.Id.ToString()}"
        );

        // assert
        Assert.Equal("GT", response.Model);
    }

    [Fact]
    public async Task GetAuctionById_WithInvalidId_ShouldReturn404()
    {
        // arrange?

        // act
        var response = await _httpClient.GetAsync($"/api/auctions/{Guid.NewGuid()}");

        // assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task GetAuctionById_WithInvalidGuid_ShouldReturn400()
    {
        // arrange?

        // act
        var response = await _httpClient.GetAsync($"/api/auctions/notaguid");

        // assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task CreateAuction_WithNoAuth_ShouldReturn401()
    {
        // arrange
        var auction = new CreateAuctionDto { Make = "test" };

        // act
        var response = await _httpClient.PostAsJsonAsync("/api/auctions", auction);

        // assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task CreateAuction_WithAuth_ShouldReturn201()
    {
        // arrange
        var auction = GetAuctionForCreate();
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));

        // act
        var response = await _httpClient.PostAsJsonAsync("/api/auctions", auction);

        // assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var createdAuction = await response.Content.ReadFromJsonAsync<AuctionDto>();
        Assert.Equal("bob", createdAuction.Seller);
    }

    [Fact]
    public async Task CreateAuction_WithInvalidCreateAuctionDto_ShouldReturn400()
    {
        // arrange
        var auction = GetAuctionForCreate();
        auction.Make = null;
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));

        // act
        var response = await _httpClient.PostAsJsonAsync("/api/auctions", auction);

        // assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task UpdateAuction_WithValidUpdateDtoAndUser_ShouldReturn200()
    {
        // arrange
        var auction = new Auction
        {
            Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
            Status = Status.Live,
            ReservePrice = 20000,
            Seller = "bob",
            AuctionEnd = DateTime.UtcNow.AddDays(10),
            Item = new Item
            {
                Make = "Ford",
                Model = "GT",
                Color = "White",
                Mileage = 50000,
                Year = 2020,
                ImageUrl = "https://cdn.pixabay.com/photo/2016/05/06/16/32/car-1376190_960_720.jpg",
            },
        };

        var updateAuction = new UpdateAuctionDto { Make = "Updated" };
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("bob"));

        // act
        var response = await _httpClient.PutAsJsonAsync(
            $"/api/auctions/{auction.Id}",
            updateAuction
        );

        // assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task UpdateAuction_WithValidUpdateDtoAndInvalidUser_ShouldReturn403()
    {
        // arrange
        var auction = new Auction
        {
            Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
            Status = Status.Live,
            ReservePrice = 20000,
            Seller = "bob",
            AuctionEnd = DateTime.UtcNow.AddDays(10),
            Item = new Item
            {
                Make = "Ford",
                Model = "GT",
                Color = "White",
                Mileage = 50000,
                Year = 2020,
                ImageUrl = "https://cdn.pixabay.com/photo/2016/05/06/16/32/car-1376190_960_720.jpg",
            },
        };

        var updateAuction = new UpdateAuctionDto { Make = "Updated" };
        _httpClient.SetFakeJwtBearerToken(AuthHelper.GetBearerForUser("notbob"));

        // act
        var response = await _httpClient.PutAsJsonAsync(
            $"/api/auctions/{auction.Id}",
            updateAuction
        );

        // assert
        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    public Task DisposeAsync()
    {
        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AuctionDbContext>();
        DbHelper.ReInitDbForTests(db);
        return Task.CompletedTask;
    }

    private CreateAuctionDto GetAuctionForCreate()
    {
        return new CreateAuctionDto
        {
            Make = "test",
            Model = "testModel",
            ImageUrl = "test",
            Color = "test",
            Mileage = 10,
            Year = 10,
            ReservePrice = 10,
            AuctionEnd = DateTime.UtcNow.AddDays(2),
        };
    }
}
