namespace ProcessX.Actions
{
    public class CreateOrderAction : IAction<Order>
    {
        private readonly IMongoCollection<Order> _orders;
        private readonly ILogger<GetInventoriesAction> _logger;
        public CreateOrderAction(
            CollectionProvider<Order> ordersCollectionProvider,
            ILogger<GetInventoriesAction> logger)
        {
            _orders = ordersCollectionProvider.GetCollection();
            _logger = logger;
        }
        public async Task<Response> PerformAction(Order request)
        {
            /*if (request.IsValidRequest)
                return new("Invalid request", HttpStatusCode.BadRequest);*/
            Order order = new()
            {

            };

            //await _orders.InsertOneAsync(data);

            return new(order, HttpStatusCode.OK);
        }
    }
}
