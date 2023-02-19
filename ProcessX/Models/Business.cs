using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ProcessX.Models
{
    public enum CompanyType
    {
        SoleTader = 0,
        PrivateCompany = 1,
        Partnership = 2,
        CloseCorporation = 3,
        NonProfit = 4,
        Trust = 5
    }
    public enum AdminRoles
    {
        [JsonPropertyName("administrator")]
        Administrator,
        [JsonPropertyName("manager")]
        Manager,
        [JsonPropertyName("viewer")]
        Viewer
    }
    [BsonIgnoreExtraElements]
    public class Business
    {
        [BsonId]
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string TradingName { get; set; }
        [BsonRepresentation(BsonType.String)]
        public CompanyType CompanyType { get; set; }
        public bool AcceptCard { get; set; } = false;
        public TradingAddress TradingAddress { get; set; }
        public Category Category { get; set; }
        public string TelephoneNumber { get; set; }
    }

    public class TradingAddress
    {
        public string Street { get; set; }
        public string Suburb { get; set; }
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public string? Building { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }

    public class Category
    {
        public string Name { get; set; }
        public string SubCategory { get; set; }
    }
}
