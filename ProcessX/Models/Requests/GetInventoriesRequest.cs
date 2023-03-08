using Amazon.Runtime.Internal;

namespace ProcessX.Models.Requests
{
    public record GetInventoriesRequest(
        string BusinessId
        ) : IRequest
    {

        public bool IsValidRequest => IsValidUpdateRequest();

        public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
        public bool IsValidUpdateRequest()
        {
            /*if (string.IsNullOrWhiteSpace(BusinessId))
                return false;*/

            return true;

        }
    }
}
