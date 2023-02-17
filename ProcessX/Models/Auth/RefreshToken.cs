using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessX.Models.Auth
{
    [BsonIgnoreExtraElements]
    public record RefreshToken
    {
        [BsonId]
        [BsonRequired, BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRequired]
        public string Token { get; set; }

        [BsonRequired, BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        [BsonRequired]
        public DateTime Expires { get; set; }
    }
}
