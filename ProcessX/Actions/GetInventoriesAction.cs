namespace ProcessX.Actions
{

    public class GetInventoriesAction : IAction<GetInventoriesRequest>
    {

        private readonly IMongoCollection<Inventory> _inventories;
        private readonly ILogger<GetInventoriesAction> _logger;

        public GetInventoriesAction(
            CollectionProvider<Inventory> inventoriesCollectionProvider,
            ILogger<GetInventoriesAction> logger)
        {
            _inventories = inventoriesCollectionProvider.GetCollection();
            _logger = logger;
        }

        public async Task<Response> PerformAction(GetInventoriesRequest request)
        {
            //if (request.IsValidRequest)
              //  return new("Invalid request", HttpStatusCode.BadRequest);

            var products = await _inventories.Find(x => x.CompanyId == request.BusinessId).ToListAsync();

            return new(products);
        }
    }
}
