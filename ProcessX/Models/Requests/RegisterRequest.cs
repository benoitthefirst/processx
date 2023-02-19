using Amazon.Runtime.Internal;

namespace ProcessX.Models.Requests
{
    public record RegisterRequest(
        string TradingName,
        string FirstName,
        string LastName,
        string Password,
        string Email,
        string TelephoneNumber,
        Category Category,
        TradingAddress TradingAddress,
        CompanyType CompanyType,
        bool AcceptCard = false
        ) : IRequest
    {

        public bool IsValidRequest => IsValidUpdateRequest();

        public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
        public bool IsValidUpdateRequest()
        {
            if (string.IsNullOrWhiteSpace(FirstName) ||
                string.IsNullOrWhiteSpace(LastName) ||
                string.IsNullOrWhiteSpace(Password) ||
                string.IsNullOrWhiteSpace(TelephoneNumber) ||
                string.IsNullOrWhiteSpace(Email))
                return false;

            return true;

        }
    }
}
