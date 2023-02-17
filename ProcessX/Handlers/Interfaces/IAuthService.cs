namespace ProcessX.Handlers.Interfaces
{
    public interface IAuthService
    {
        bool IsTokenValid(string token, string secretKey);

        /// <summary>
        /// Only the secret key set in the <paramref name="model"/> is used to verify the token
        /// </summary>
        /// <param name="token"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        bool IsTokenValid(string token, IAuthContainerModel model)
            => IsTokenValid(token, model.SecretKey);
        string GenerateToken(IAuthContainerModel model);
        JwtToken GenerateJwtToken(IAuthContainerModel model);
#nullable enable
        IEnumerable<Claim>? GetTokenClaims(string token, string secretKey);
        ClaimsPrincipal GetClaimsPrincipal(string token, string secretKey);
        ClaimsPrincipal GetClaimsPrincipal(string token, IAuthContainerModel model)
            => GetClaimsPrincipal(token, model.SecretKey);

        IEnumerable<Claim>? PeekClaims(string token);

#nullable restore

        internal TokenValidationParameters GetTokenValidationParameters(string secretKey);
        internal TokenValidationParameters GetTokenValidationParameters(IAuthContainerModel model)
            => GetTokenValidationParameters(model.SecretKey);
    }
}
