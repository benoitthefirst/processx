namespace ProcessX.Handlers.Auth
{
    internal record JwtContainerModel : IAuthContainerModel, IAuthRefreshTokenContainerModel
    {
        string IAuthContainerModel.SecretKey => SecretKey;
        internal string SecretKey { get; init; }
        public string SecurityAlgorithm { get; init; }
        public long ExpiresIn { get; init; }
        public IEnumerable<Claim>? Claims { get; init; }

        public JwtContainerModel(string secretKey, string securityAlgorithm, long expiresIn, IEnumerable<Claim>? claims = null)
        {
            SecretKey = secretKey;
            SecurityAlgorithm = securityAlgorithm;
            ExpiresIn = expiresIn;
            Claims = claims;
        }

        public IAuthContainerModel WithSecretKey(string secretKey)
        {
            return this with { SecretKey = secretKey };
        }

        public IAuthContainerModel WithAlgorithm(string securityAlgorithm)
        {
            return this with { SecurityAlgorithm = securityAlgorithm };
        }

        public IAuthContainerModel WithExpiresMinutes(long expires)
        {
            return this with { ExpiresIn = expires };
        }

        public IAuthContainerModel WithClaimes(IEnumerable<Claim>? claimes)
        {
            return this with { Claims = claimes };
        }

    }

}
