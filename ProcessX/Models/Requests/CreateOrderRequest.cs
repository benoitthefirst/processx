using System.Xml.Linq;

namespace ProcessX.Models.Requests
{
    public record CreateOrderRequest(ContactInfo ContactInfo, ShippingAddress ShippingAddress, PaymentMethod PaymentMethod, List<OrderProduct> Products) : IRequest
    {
        public bool IsValidRequest => IsValidUpdateRequest();

        public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
        public bool IsValidUpdateRequest()
        {
            if (ContactInfo is null || ShippingAddress is null || PaymentMethod is null || Products is null)
                return false;

            return true;

        }
    }
}
