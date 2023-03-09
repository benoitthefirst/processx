namespace ProcessX.Actions
{

    public class GetOrdersAction : IAction<GetOrdersRequest>
    {

        private readonly IMongoCollection<Order> _orders;
        private readonly ILogger<GetOrdersAction> _logger;

        public GetOrdersAction(
            CollectionProvider<Order> ordersCollectionProvider,
            ILogger<GetOrdersAction> logger)
        {
            _orders = ordersCollectionProvider.GetCollection();
            _logger = logger;
        }

        public async Task<Response> PerformAction(GetOrdersRequest request)
        {
            if (!request.IsValidRequest)
                return new("Invalid request", HttpStatusCode.BadRequest);

            var products = await _orders.Find(x => x.CompanyId == request.BusinessId).ToListAsync();

            return new(products);
        }
    }
}
