using System.Security.Claims;

namespace AuctionService.Tests.Unit.Utils;

public class Helpers
{
    public static ClaimsPrincipal GetClaimsPrincipal()
    {
        var claims = new List<Claim> { new(ClaimTypes.Name, "test") };
        var identity = new ClaimsIdentity(claims, "testing");
        return new ClaimsPrincipal(identity);
    }
}
