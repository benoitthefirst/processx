using Amazon.Runtime.Internal;

namespace ProcessX.Models.Requests
{
    public record RegisterRequest(
        string FirstName,
        string LastName,
        string Password,
        string Email,
        string telephoneNumber,
        string category,
        TradingAddress tradingAddress,
        CompanyType companyType = CompanyType.PrivateCompany,
        bool acceptCard = false
        ) : IRequest
    {

        public bool IsValidRequest => IsValidUpdateRequest();

        public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
        public bool IsValidUpdateRequest()
        {
            if (string.IsNullOrWhiteSpace(FirstName) ||
                string.IsNullOrWhiteSpace(LastName) ||
                string.IsNullOrWhiteSpace(Password) ||
                string.IsNullOrWhiteSpace(telephoneNumber) ||
                string.IsNullOrWhiteSpace(Email))
                return false;

            return true;

        }
    }
}
