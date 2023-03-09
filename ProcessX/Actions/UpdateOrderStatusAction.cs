namespace ProcessX.Actions
{
    public class UpdateOrderStatusAction : IAction<UpdateOrderStatusRequest>
    {

        private readonly IMongoCollection<Order> _orders;
        private readonly ILogger<UpdateOrderStatusAction> _logger;

        public UpdateOrderStatusAction(
            CollectionProvider<Order> ordersCollectionProvider,
            ILogger<UpdateOrderStatusAction> logger)
        {
            _orders = ordersCollectionProvider.GetCollection();
            _logger = logger;
        }

        public async Task<Response> PerformAction(UpdateOrderStatusRequest request)
        {
            try
            {
                var filter = Builders<Order>.Filter.Eq(x => x.Sku, request.OrderId);

                var updateBuilder = Builders<Order>.Update;

                if (!request.IsValidRequest)
                    return new("Invalid update request", HttpStatusCode.BadRequest);

                Enum.TryParse(request.Status, out OrderStatus _status);

                var updates = updateBuilder.Set(x => x.Status, _status);

                var options = new UpdateOptions { IsUpsert = false };

                var updateResult = await _orders.UpdateOneAsync(filter, updates, options);

                var updated = updateResult.IsAcknowledged && updateResult.IsModifiedCountAvailable && updateResult.ModifiedCount == 1;

                if (!updated)
                    return new Response(HttpStatusCode.NotFound, "Order not found.");

                return new Response(HttpStatusCode.OK, data: "Updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, nameof(UpdateOrderStatusAction));
                return new(HttpStatusCode.InternalServerError, "Internal server error, try again later!");
            }
        }
    }
}
