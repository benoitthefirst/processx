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

    [BsonIgnoreExtraElements]
    public class Staff
    {
        [BsonId]
        [Required]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<CompanyId> Companies { get; set; } = new();
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public string? MobileNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public enum PermissionType {
        staffMember = 0,
        supervisor = 1,
        manager = 2,
        administrator = 3,
        custom = 4,
    }
    public enum SalesPermissionType {
        makeSales = 0,
        viewTransactions = 1,
        refundOwnLastSale = 2,
        refundAnySale = 3,
    }
    public enum ManagingPermissionType {
        manageProducts = 0,
        manageStaff = 1,
        viewFinancials = 2,
        manageBusinessSettings = 3,
        manageReports = 4,
        manageExternalPrinters = 5,
    }
    public class Permission {
        public string Name {get;set;}
        [BsonRepresentation(BsonType.String)]
        public PermissionType PermissionType {get;set;}
        
        [BsonRepresentation(BsonType.String)]
        public List<SalesPermissionType> SalesAccess {get;set;}
        [BsonRepresentation(BsonType.String)]
        public List<ManagingPermissionType> ManagingAccess {get;set;}
    };

    public class CompanyId{
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id;
        [BsonElement("role")]
        [BsonRepresentation(BsonType.String)]
        public AdminRoles Role { get; set; }
        public Permission Permissions { get; set; }
    }
}
