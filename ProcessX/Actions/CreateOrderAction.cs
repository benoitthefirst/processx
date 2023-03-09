using ProcessX.Helpers;

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
            //TO-DO
            //seriliaze the data to generate a signiture
            //that we will compare with signiture sent
            //from the frontend
            //send order email to admin
            //send order received email to customer
            //Save to database

            if (!request.IsValidRequest)
                return new("Invalid request", HttpStatusCode.BadRequest);

            Order order = new()
            {
                Sku = "p".GenerateSku(),
                CompanyId = request.BusinessId,
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
