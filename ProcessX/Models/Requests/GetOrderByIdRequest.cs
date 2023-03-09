namespace ProcessX.Models.Requests
{
    public record GetOrderByIdRequest(string BusinessId,string OrderId) : IRequest
    {
        public bool IsValidRequest => IsValidUpdateRequest();

        public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
        public bool IsValidUpdateRequest()
        {
            if (string.IsNullOrWhiteSpace(BusinessId) || string.IsNullOrWhiteSpace(OrderId))
                return false;

            return true;

        }
    }
}
