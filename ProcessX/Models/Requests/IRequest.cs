namespace ProcessX.Models.Requests
{
    internal interface IRequest
    {
        internal bool IsValidRequest { get; }
        internal DateTimeOffset Now { get; set; }
    }
}
