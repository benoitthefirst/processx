namespace ProcessX.Helpers.Extensions
{
    public static class UserModelExtensions
    {
        public static async Task<Response<JwtTokenModel>> GenerateTokens(
            this Business user,
            IAuthService authService,
            IAuthContainerModel accessTokenModel,
            IAuthRefreshTokenContainerModel refreshTokenModel,
            IMongoCollection<RefreshToken> refreshTokens)
        {

            List<Claim> refresh_claims = new();
            refresh_claims.Add(new Claim(ClaimTypes.Role, ConfigAuthPolicies.Roles.RefreshToken));
            refresh_claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            var refresh_token = authService.GenerateJwtToken(refreshTokenModel.WithClaimes(refresh_claims));

            RefreshToken refreshToken = new()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Token = refresh_token.Token,
                UserId = user.Id,
                Expires = DateTime.UtcNow.AddSeconds(refresh_token.ExpiresAt)
            };
            var insertTask = refreshTokens.InsertOneAsync(refreshToken);

            List<Claim> access_claims = new();
            access_claims.Add(new Claim(ClaimTypes.Role, ProcessXRoles.Admin));
            access_claims.Add(new Claim(ClaimTypes.Role, ConfigAuthPolicies.Roles.AccessToken));
            access_claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));

            var access_token = authService.GenerateJwtToken(accessTokenModel.WithClaimes(access_claims));

            await insertTask;

            return new Response<JwtTokenModel>(new(refresh_token, access_token));
        }

        public static async Task<Response<JwtTokenModel>> GenerateTokens(
            this Staff user,
            AdminRoles role,
            IAuthService authService,
            IAuthContainerModel accessTokenModel,
            IAuthRefreshTokenContainerModel refreshTokenModel,
            IMongoCollection<RefreshToken> refreshTokens)
        {

            List<Claim> refresh_claims = new();
            refresh_claims.Add(new Claim(ClaimTypes.Role, ConfigAuthPolicies.Roles.RefreshToken));
            refresh_claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            var refresh_token = authService.GenerateJwtToken(refreshTokenModel.WithClaimes(refresh_claims));

            RefreshToken refreshToken = new()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Token = refresh_token.Token,
                UserId = user.Id,
                Expires = DateTime.UtcNow.AddSeconds(refresh_token.ExpiresAt)
            };
            var insertTask = refreshTokens.InsertOneAsync(refreshToken);

            var _role = ProcessXAdminRoles.Viewer;
            var _policyToken = ConfigAuthPolicies.Roles.AccessToken;

            if(role == AdminRoles.Administrator){
                _role = ProcessXAdminRoles.Administrator;
                _policyToken = ConfigAuthPolicies.Roles.AdminToken;
            }
            else if(role == AdminRoles.Manager){
                _role = ProcessXAdminRoles.Manager;
                _policyToken = ConfigAuthPolicies.Roles.AdminManagerToken;
            }
            else if(role == AdminRoles.Viewer){
                _role = ProcessXAdminRoles.Viewer;
                _policyToken = ConfigAuthPolicies.Roles.AdminViewerToken;
            }

            List<Claim> access_claims = new();
            access_claims.Add(new Claim(ClaimTypes.Role, _role));
            access_claims.Add(new Claim(ClaimTypes.Role, _policyToken));
            access_claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));

            var access_token = authService.GenerateJwtToken(accessTokenModel.WithClaimes(access_claims));

            await insertTask;

            return new Response<JwtTokenModel>(new(refresh_token, access_token));
        }
    }
}
