using Npgsql;
using Polly;
using Serilog;
using Log = Serilog.Log;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console(formatProvider: CultureInfo.InvariantCulture)
    .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
    var builder = WebApplication.CreateBuilder(args);

    var app = builder.ConfigureLogging().ConfigureServices().ConfigurePipeline();

    var retryPolicy = Policy
        .Handle<NpgsqlException>()
        .WaitAndRetry(5, retryAttempt => TimeSpan.FromSeconds(5));

    retryPolicy.ExecuteAndCapture(() => SeedData.EnsureSeedData(app));

    app.Run();
}
catch (Exception ex) when (ex is not HostAbortedException)
{
    Log.Fatal(ex, "Unhandled exception");
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}
