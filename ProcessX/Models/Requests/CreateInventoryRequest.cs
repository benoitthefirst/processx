using Amazon.Runtime.Internal;

namespace ProcessX.Models.Requests
{
    public record CreateInventoryRequest(
        string Name,
        decimal Price
        ) : IRequest
    {
        public decimal CostPrice { get; set; }
        public Currency Currency { get; set; }
        public Thubnail? Thubnail { get; set; }
        public string? Description { get; set; }
        public string? Sku {get;set;}
        public string? BrandId {get;set;}
        public string? LeadTime { get;set;}
        public string? CategoryId {get;set;}
        public int Quantity {get;set;} = 0;
        public string? QauntityUnits { get; set; }
        public bool StockTracking { get; set; } = false;
        public bool VariantLevel { get; set; } = false;
        public bool LowStockLevel { get; set; } = false;
        public bool AskForPrice { get; set; } = false;
        public List<String>? Colors {get; set;} = new();
        public List<String>? Materials {get; set;} = new();
        public List<Variant>? Variants { get; set; } = new();
        public List<String>? Images {get; set;} = new();

        public bool IsValidRequest => IsValidUpdateRequest();

        public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
        public bool IsValidUpdateRequest()
        {
            if (string.IsNullOrWhiteSpace(Name) || 
            Price > 0 || 
            CostPrice > 0)
                return false;

            return true;

        }
    }
}
