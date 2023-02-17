namespace ProcessX.Handlers.Auth
{
    internal class JwtAuthenticationHandlerAuth : AuthenticationHandler<JwtBearerOptions>
    {
        private readonly IAuthService _authService;
        private readonly IAuthRefreshTokenContainerModel _refreshTokenContainerModel;
        private readonly IAuthContainerModel _accessTokenContainerModel;
        private readonly IMongoCollection<RefreshToken> _refreshTokens;

        public JwtAuthenticationHandlerAuth(
            IAuthService authService,
            IAuthRefreshTokenContainerModel refreshTokenContainerModel,
            IAuthContainerModel accessTokenContainerModel,
            CollectionProvider<RefreshToken> collectionProvider,
            IOptionsMonitor<JwtBearerOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
            _authService = authService;
            _refreshTokenContainerModel = refreshTokenContainerModel;
            _accessTokenContainerModel = accessTokenContainerModel;
            _refreshTokens = collectionProvider.GetCollection();
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            string token = Request.Headers.Authorization;

            if (string.IsNullOrWhiteSpace(token))
                return AuthenticateResult.Fail("Token required");

            var split = token.Split(' ');
            if (split.Length > 1)
                token = split[1];

            else token = split[0];

            var isAccessToken = _authService.IsTokenValid(token, _accessTokenContainerModel);
            if (isAccessToken)
            {
                var ticket = new AuthenticationTicket(_authService.GetClaimsPrincipal(token, _accessTokenContainerModel), Scheme.Name);

                return AuthenticateResult.Success(ticket);
            }
            else if (_authService.IsTokenValid(token, _refreshTokenContainerModel))
            {
                var refreshToken = await (await _refreshTokens.FindAsync(x => x.Token == token)).FirstOrDefaultAsync();

                if (refreshToken is null)
                    return AuthenticateResult.Fail("Invalid Refresh Token");

                var deleteTask = _refreshTokens.DeleteOneAsync(x => x.Id == refreshToken.Id);

                var principal = _authService.GetClaimsPrincipal(token, _refreshTokenContainerModel);
                ClaimsIdentity userIdentity = new(new Claim[] { new(ClaimTypes.NameIdentifier, refreshToken.UserId) });
                principal.AddIdentity(userIdentity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);

                await deleteTask;

                return AuthenticateResult.Success(ticket);
            }

            return AuthenticateResult.Fail("Invalid token");
        }
    }

}
