namespace ProcessX.Models
{
    [BsonIgnoreExtraElements]
    public class Order
    {
        [BsonId]
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string Sku { get; set; } = string.Empty;
        [BsonRepresentation(BsonType.String)]
        public OrderStatus Status { get; set; }
        public ContactInfo ContactInfo { get; set; } = new();
        public ShippingAddress ShippingAddress { get; set; } = new();
        public PaymentMethod PaymentMethod { get; set; } = new();
        public List<OrderProduct> Products { get; set; } = new();
        [JsonConverter(typeof(NullableDateTimeConverter))]
        public DateTime? LastUpdated { get; set; }
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }

    public enum OrderStatus
    {
        ItemPlaced = 0,
        WaitingPayment = 1,
        Paid = 2,
        Processed = 3,
        PickedUp = 4,
        Devilered = 5
    }

    public class ContactInfo
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string? Company { get; set; }
    }

    public class ShippingAddress
    {
        public string Street { get; set; } = string.Empty;
        public string Suburb { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int PostalCode { get; set; }
        public string Country { get; set; } = string.Empty;
        public DeliveryMethod DeliveryMethod { get; set; } = new();
    }

    public class DeliveryMethod
    {
        public string Name { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
    }

    public class PaymentMethod
    {
        public string Name { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
    }

    public class OrderProduct
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Sku { get; set; } = string.Empty;
        public string Price { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
        public string Thumbnail { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
    }
}
