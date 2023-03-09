using System.Xml.Linq;

namespace ProcessX.Models.Requests
{
    public record CreateOrderRequest(ContactInfo ContactInfo, ShippingAddress ShippingAddress, PaymentMethod PaymentMethod, List<OrderProduct> Products) : IRequest
    {
        public string BusinessId { get; set; } = string.Empty;
        public bool IsValidRequest => IsValidUpdateRequest();

        public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
        public bool IsValidUpdateRequest()
        {
            if (ContactInfo is null || ShippingAddress is null || PaymentMethod is null || Products is null || string.IsNullOrWhiteSpace(BusinessId))
                return false;

            return true;

        }
    }
}
