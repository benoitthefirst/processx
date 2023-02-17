namespace ProcessX.Handlers.Auth
{
    internal class JwtAuthService : IAuthService
    {

        private static System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler jwtSecurityTokenHandler = new();
        private static JsonWebTokenHandler jsonWebTokenHandler = new();

        #region Members

        /// <summary>
        /// The secret key we use to encrypt out token with.
        /// </summary>
        internal string? Issuer { get; }
        internal string? Audience { get; }
        internal bool ValidateIssuer { get; }
        internal bool ValidateAudience { get; }

        #endregion

        #region Constructor

        public JwtAuthService(string? issuer = null, string? audience = null
            , bool validateIssuer = false, bool validateAudience = false)
        {
            Issuer = issuer;
            Audience = audience;

            if (validateIssuer && string.IsNullOrWhiteSpace(issuer))
                throw new ArgumentException($"{nameof(validateIssuer)} is set to true, but no valid issuer is provided");

            ValidateIssuer = validateIssuer;

            if (validateAudience && string.IsNullOrWhiteSpace(audience))
                throw new ArgumentException($"{nameof(validateAudience)} is set to true, but no valid audience is provided");

            ValidateAudience = validateAudience;
        }

        #endregion

        /// <summary>
        /// Generates token by given model.
        /// Validates whether the given token is valid, then gets the symmetric key.
        /// Encrypt the token and returns it.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Generated string token</returns>
        public string GenerateToken(IAuthContainerModel model)
        {
            SecurityTokenDescriptor securityTokenDescriptor = GenerateSecurityTokenDescriptor(model);
            return SecurityTokenToString(securityTokenDescriptor);
        }

        /// <summary>
        /// Generates token by given model.
        /// Validates whether the given token is valid, then gets the symmetric key.
        /// Encrypt the token and returns it.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Generated SecurityToken token</returns>
        JwtToken IAuthService.GenerateJwtToken(IAuthContainerModel model)
        {
            var securityTokenDescriptor = GenerateSecurityTokenDescriptor(model);
            var token = SecurityTokenToString(securityTokenDescriptor);
            return new(token, (DateTime)securityTokenDescriptor.Expires!);
        }

        /// <summary>
        /// <returns>IEnumerable of claims for the given token.</returns> 
        /// Receives the claims of the token by given token string.
        /// </summary>
        /// <remarks>
        /// Pay attention, one the token is FAKE will throw exception.
        /// </remarks>
        /// <param name="token"></param>
        /// <returns>IEnumerable of claims for the given token.</returns>

        public IEnumerable<Claim> GetTokenClaims(string token, string secretKey)
        {
            return GetClaimsPrincipal(token, secretKey).Claims;
        }

        /// <summary>
        /// <returns>ClaimsPrincipal for the given token.</returns>
        /// Receives the claims of the token by given token string.
        /// </summary>
        /// <remarks>
        /// Pay attention! When the token is FAKE will throw exception.
        /// </remarks>
        /// <param name="token"></param>

        public ClaimsPrincipal GetClaimsPrincipal(string token, string secretKey)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new ArgumentNullException(nameof(token));

            if (!jsonWebTokenHandler.CanReadToken(token))
                throw new ArgumentException("The provided token is not a valid Json Web Token!", nameof(token));

            TokenValidationParameters tokenValidationParameters = GetTokenValidationParameters(secretKey);
            var validationResult = jsonWebTokenHandler.ValidateToken(token, tokenValidationParameters);

            if (!validationResult.IsValid)
                throw new Exception("Invalid token", validationResult.Exception);

            return new ClaimsPrincipal(validationResult.ClaimsIdentity);
        }

        /// <summary>
        /// Validates whether a given token is valid or not, and returns true in case the is valid otherwise it will return false
        /// </summary>
        /// <param name="token"></param>
        /// <returns>true or false</returns>

        public bool IsTokenValid(string token, string secretKey)
        {
            try
            {
                ClaimsPrincipal tokenValid = GetClaimsPrincipal(token, secretKey);
                return true;
            }
            catch
            {
                return false;
            }
        }

        IEnumerable<Claim> IAuthService.PeekClaims(string token)
            => PeekClaims(token);

        #region Private Methods

        private SecurityTokenDescriptor GenerateSecurityTokenDescriptor(IAuthContainerModel model)
        {
            if (model == null)
                throw new ArgumentNullException(nameof(model));

            var _securityAlgorithm = model.SecurityAlgorithm;
            SecurityTokenDescriptor securityTokenDescriptor = new()
            {
                Subject = new(model.Claims),
                SigningCredentials = new(GetSymmetricSecurityKey(model.SecretKey),
                _securityAlgorithm),
                Issuer = Issuer,
                Audience = Audience
            };

            if (model.ExpiresIn > 0)
            {
                securityTokenDescriptor.Expires = DateTime.UtcNow.AddSeconds(model.ExpiresIn);
            }
            else if (model.ExpiresIn == 0)
            {
                // we don't want to issue expired tokens
                securityTokenDescriptor.Expires = DateTime.UtcNow.Add(new TokenValidationParameters().ClockSkew);
            }

            return securityTokenDescriptor;
        }

        internal TokenValidationParameters GetTokenValidationParameters(string secretKey)
        {
            return new()
            {
                ValidateIssuer = ValidateIssuer,
                ValidateAudience = ValidateAudience,
                ValidIssuer = Issuer,
                ValidAudience = Audience,
                IssuerSigningKey = GetSymmetricSecurityKey(secretKey),
                RequireExpirationTime = true,
                ClockSkew = TimeSpan.Zero
            };
        }

        TokenValidationParameters IAuthService.GetTokenValidationParameters(string secretKey)
            => GetTokenValidationParameters(secretKey);

        #endregion

        #region Static Methods

        public static IEnumerable<Claim> PeekClaims(string token)
        {
            try
            {
                return jsonWebTokenHandler.ReadJsonWebToken(token).Claims;
            }
            catch
            {
                return Enumerable.Empty<Claim>();
            }
        }

        public static string SecurityTokenToString(SecurityTokenDescriptor securityToken)
            => jsonWebTokenHandler.CreateToken(securityToken);

        private static SecurityKey GetSymmetricSecurityKey(string secretKey)
        {
            if (string.IsNullOrWhiteSpace(secretKey))
                throw new ArgumentNullException($"{nameof(secretKey)} must not be null or empty!");

            byte[] symmetricKey = Encoding.UTF8.GetBytes(secretKey);
            return new SymmetricSecurityKey(symmetricKey);
        }

        #endregion

    }
}
