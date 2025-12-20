namespace IdentityService.Pages.Ciba;

[SecurityHeaders]
[Authorize]
public class AllModel : PageModel
{
    private readonly IBackchannelAuthenticationInteractionService _backchannelAuthenticationInteraction;

    public AllModel(
        IBackchannelAuthenticationInteractionService backchannelAuthenticationInteractionService
    )
    {
        _backchannelAuthenticationInteraction = backchannelAuthenticationInteractionService;
    }

    public IEnumerable<BackchannelUserLoginRequest> Logins { get; set; } = default!;

    public async Task OnGet()
    {
        Logins =
            await _backchannelAuthenticationInteraction.GetPendingLoginRequestsForCurrentUserAsync();
    }
}
