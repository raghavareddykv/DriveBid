using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services;

public class AuctionSvcHttpClient(HttpClient httpClient, IConfiguration config)
{
    public async Task<List<Item>> GetItemsForSearchDb()
    {
        // Get the last updated item from Mongo DB
        var lastUpdated = await DB.Find<Item, string>()
            .Sort(x => x.Descending(d => d.UpdatedAt))
            .Project(x => x.UpdatedAt.ToString())
            .ExecuteFirstAsync();

        return await httpClient.GetFromJsonAsync<List<Item>>(config["AuctionServiceUrl"]
                                                             + "/api/auctions?date=" + lastUpdated);
    }
}