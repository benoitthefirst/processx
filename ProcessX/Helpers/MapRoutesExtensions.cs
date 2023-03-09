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

            api.MapGet("/{businessId}/orders", async ([FromRoute(Name = "businessId")] string businessId, IAction<GetOrdersRequest> action) =>
            {
                return await action.PerformAction(new(businessId)).ToResultTask();
            });

            api.MapGet("/{businessId}/orders/{trackingNumber}", async ([FromRoute(Name = "businessId")] string businessId, 
                [FromRoute(Name = "trackingNumber")] string trackingNumber, IAction<GetOrderStatusRequest> action) =>
            {
                return await action.PerformAction(new(businessId, trackingNumber)).ToResultTask();
            });

            api.MapPost("/{businessId}/orders/add", async ([FromRoute(Name = "businessId")] string businessId, [FromBody] CreateOrderRequest model, IAction<CreateOrderRequest> action) =>
            {
                model.BusinessId = businessId;
                return await action.PerformAction(model).ToResultTask();
            });

            return routes;
        }
    }
}
