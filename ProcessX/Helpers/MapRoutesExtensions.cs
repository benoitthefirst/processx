namespace ProcessX.Helpers
{
    internal static class MapRoutesExtensions
    {
        public static IEndpointRouteBuilder MapActions(this IEndpointRouteBuilder routes)
        {
            var api = routes.MapGroup("/api");

            var jsonContentType = MediaTypeNames.Application.Json;


            api.MapGet("/", () => Results.Ok(DateTimeOffset.UtcNow));
            return routes;
        }
    }
}
