using Microsoft.AspNetCore.Mvc;

namespace ProcessX.Helpers
{
    internal static class MapRoutesExtensions
    {
        public static IEndpointRouteBuilder MapActions(this IEndpointRouteBuilder routes)
        {
            var api = routes.MapGroup("/api");

            var jsonContentType = MediaTypeNames.Application.Json;


            api.MapGet("/", () => Results.Ok(DateTimeOffset.UtcNow));

            api.MapPost("/auth/register", async (RegisterRequest model,IAction<RegisterRequest> action) =>
            {
                return await action.PerformAction(model).ToResultTask();
            });

            api.MapGet("/products", async ([FromQuery(Name = "businessId")] string businessId, IAction<GetInventoriesRequest> action) =>
            {
                Console.WriteLine(businessId);
                return await action.PerformAction(new(businessId)).ToResultTask();
            });

            api.MapPost("/products/add", async (CreateInventoryRequest model,IAction<CreateInventoryRequest> action) =>
            {
                return await action.PerformAction(model).ToResultTask();
            });

            api.MapGet("/orders", async ([FromQuery(Name = "businessId")] string businessId, IAction<GetOrdersRequest> action) =>
            {
                return await action.PerformAction(new(businessId)).ToResultTask();
            });

            api.MapPost("/orders/add", async (CreateOrderRequest model, IAction<CreateOrderRequest> action) =>
            {
                return await action.PerformAction(model).ToResultTask();
            });

            return routes;
        }
    }
}
