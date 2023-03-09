namespace ProcessX.Models.Requests
{
    public record GetOrderStatusRequest(string BusinessId, string TrackingNumber):IRequest
    {
        public bool IsValidRequest => IsValidUpdateRequest();

        public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
        public bool IsValidUpdateRequest()
        {
            if (string.IsNullOrWhiteSpace(TrackingNumber))
                return false;

            return true;

        }
    }
}
