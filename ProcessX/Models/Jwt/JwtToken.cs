namespace ProcessX.Models.Jwt
{
    public record JwtToken
    {
        public string Token { get; init; }
        public long ExpiresAt { get; init; }

        [JsonConstructor]
        public JwtToken(string token, long expiresAt)
        {
            Token = token;
            ExpiresAt = expiresAt;
        }

        public JwtToken(string token, DateTime expiresAt)
            : this(token, (long)(expiresAt - DateTime.UnixEpoch).TotalSeconds)
        { }

        public void Deconstruct(out string token, out long expiresAt)
        {
            token = Token;
            expiresAt = ExpiresAt;
        }
    }
}
