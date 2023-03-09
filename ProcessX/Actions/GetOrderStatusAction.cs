namespace ProcessX.Actions
{

    public class GetOrderStatusAction : IAction<GetOrderStatusRequest>
    {

        private readonly IMongoCollection<Order> _orders;
        private readonly ILogger<GetOrderStatusAction> _logger;

        public GetOrderStatusAction(
            CollectionProvider<Order> ordersCollectionProvider,
            ILogger<GetOrderStatusAction> logger)
        {
            _orders = ordersCollectionProvider.GetCollection();
            _logger = logger;
        }

        public async Task<Response> PerformAction(GetOrderStatusRequest request)
        {
            if (!request.IsValidRequest)
                return new("Invalid request", HttpStatusCode.BadRequest);

            var order = await _orders.Find(x => x.Sku == request.TrackingNumber).FirstOrDefaultAsync();

            if (order is null)
                return new(HttpStatusCode.NoContent, "We couldn't find any Order with this tracking number, double check your order number and try again later");

            //To-Do:
            //check if order exist
            //Return order in a new object
            //if they haven't paid return payment url

            return new(order);
        }
    }
}
