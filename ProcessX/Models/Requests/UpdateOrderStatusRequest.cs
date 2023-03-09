namespace ProcessX.Models.Requests
{
    public record UpdateOrderStatusRequest(string OrderId,string Status) : IRequest
    {
        public string BusinessId { get; set; } = string.Empty;
        public string? StatusMessage { get; set; } = string.Empty;
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
