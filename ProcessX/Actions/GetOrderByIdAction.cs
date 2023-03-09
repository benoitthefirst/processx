namespace ProcessX.Actions
{

    public class GetOrderByIdAction : IAction<GetOrderByIdRequest>
    {

        private readonly IMongoCollection<Order> _orders;
        private readonly ILogger<GetOrderByIdAction> _logger;

        public GetOrderByIdAction(
            CollectionProvider<Order> ordersCollectionProvider,
            ILogger<GetOrderByIdAction> logger)
        {
            _orders = ordersCollectionProvider.GetCollection();
            _logger = logger;
        }

        public async Task<Response> PerformAction(GetOrderByIdRequest request)
        {
            if (!request.IsValidRequest)
                return new("Invalid request", HttpStatusCode.BadRequest);

            var order = await _orders.Find(x => x.Sku == request.OrderId).FirstOrDefaultAsync();

            if (order is null)
                return new(HttpStatusCode.NoContent, "We couldn't find any Order with this order number.");

            return new(order);
        }
    }
}
