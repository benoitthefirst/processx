using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ProcessX.Models
{
    public enum CompanyType
    {
        SoleTader,
        PrivateCompany,
        Partnership,
        CloseCorporation,
        NonProfit,
        Trust
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
        [BsonElement("role")]
        [BsonRepresentation(BsonType.String)]
        public AdminRoles Role { get; set; }
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

    [BsonIgnoreExtraElements]
    public class Staff
    {
        [BsonId]
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string CompanyId { get; set; }
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public string? MobileNumber { get; set; }
        public string Email { get; set; }
        public string Permissions { get; set; }
        public string Password { get; set; }
    }
}
