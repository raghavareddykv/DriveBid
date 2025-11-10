using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer(IMapper mapper)
    : IConsumer<AuctionUpdated>
{
    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine("--> Consuming AuctionUpdated: " + context.Message.Id);

        var item = mapper.Map<Item>(context.Message);

        var result = await DB.Update<Item>()
            .Match(m => m.ID == context.Message.Id)
            .ModifyOnly(mo => new
            {
                mo.Color,
                mo.Make,
                mo.Model,
                mo.Year,
                mo.Mileage
            }, item)
            .ExecuteAsync();

        if (!result.IsAcknowledged)
            throw new MessageException(typeof(AuctionUpdated), "Problem updating aution in MongoDB");
    }
}