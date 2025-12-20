namespace IdentityService.Pages.Diagnostics;

[SecurityHeaders]
[Authorize]
public class Index : PageModel
{
    public ViewModel View { get; set; } = default!;

    public async Task<IActionResult> OnGet()
    {
        //Replace with an authorization policy check
        // if (HttpContext.Connection.IsRemote()) return NotFound();

        View = new ViewModel(await HttpContext.AuthenticateAsync());

        return Page();
    }
}
