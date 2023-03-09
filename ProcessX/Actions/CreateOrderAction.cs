namespace ProcessX.Actions
{
    public class CreateOrderAction : IAction<CreateOrderRequest>
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
        public async Task<Response> PerformAction(CreateOrderRequest request)
        {
            /*if (request.IsValidRequest)
                return new("Invalid request", HttpStatusCode.BadRequest);*/
            Order order = new()
            {
                Sku = "p64t475867",
                Status = OrderStatus.ItemPlaced,
                ContactInfo = request.ContactInfo,
                ShippingAddress = request.ShippingAddress,
                PaymentMethod = request.PaymentMethod,
                Products = request.Products,
                LastUpdated = DateTime.UtcNow,
            };

            //await _orders.InsertOneAsync(data);

            return new(order, HttpStatusCode.OK);
        }
    }
}
