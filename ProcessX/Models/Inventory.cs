using System.ComponentModel.DataAnnotations;

namespace ProcessX.Models
{
    [BsonIgnoreExtraElements]
    public class Inventory
    {
        [BsonId]
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string Name { get; set; }
        
        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? CategoryId { get; set; }
        public decimal Price { get; set; }
        public decimal CostPrice { get; set; }
        public Currency Currency { get; set; }
        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Description { get; set; }
        
        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? BrandId { get; set; }
        
        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public Thubnail? Thubnail { get; set; } = new();
        public string Sku { get; set; }
        public int Quantity { get; set; }

        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? LeadTime { get; set; }

        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? QauntityUnits { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId;
        public bool StockTracking { get; set; } = false;
        public bool VariantLevel { get; set; } = false;
        public bool LowStockLevel { get; set; } = false;
        public bool AskForPrice { get; set; } = false;
        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public List<String>? Images {get; set;} = new();
        
        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public List<String>? Colors {get; set;} = new();
        
        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public List<String>? Materials {get; set;} = new();
        
        [BsonIgnoreIfDefault]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public List<Variant>? Variants { get; set; } = new();

    }

    public class Thubnail {
        public string Value {get; set;}
        public string Color {get; set;}
        public ThumbnailType Type {get; set;}
    }

    public class Variant {
        public string Name {get; set;}
        public decimal Price {get; set;}
        public string Sku {get; set;}
        public bool IsActive {get; set;}
    }

    public enum ThumbnailType{
        Abbriviation = 0,
        Icon = 1,
        Images = 2
    }

    public enum Currency{
        ZAR,
        USD,
        CDR,
    }
}
