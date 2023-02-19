namespace ProcessX.Actions
{
    public class RegisterAction : IAction<RegisterRequest>
    {

        private readonly IMongoCollection<Business> _businesses;
        private readonly IMongoCollection<Staff> _staffs;
        private readonly IMongoCollection<RefreshToken> _refreshTokens;
        private readonly IAuthService _authService;
        private readonly IAuthContainerModel _accessTokenModel;
        private readonly IAuthRefreshTokenContainerModel _refreshTokenModel;
        private readonly IPasswordService _passwordService;

        public RegisterAction(
            CollectionProvider<Business> usersCollectionProvider,
            CollectionProvider<Staff> staffsCollectionProvider,
            CollectionProvider<RefreshToken> refreshTokensCollectionProvider,
            IAuthService authService,
            IAuthContainerModel accessTokenModel,
            IAuthRefreshTokenContainerModel refreshTokenModel,
            IPasswordService passwordService)
        {
            _businesses = usersCollectionProvider.GetCollection();
            _staffs = staffsCollectionProvider.GetCollection();
            _refreshTokens = refreshTokensCollectionProvider.GetCollection();
            _authService = authService;
            _accessTokenModel = accessTokenModel;
            _refreshTokenModel = refreshTokenModel;
            _passwordService = passwordService;
        }

        public async Task<Response> PerformAction(RegisterRequest request)
        {
            //request = request.Sanitize();
            /* var user = await _businesses.Find(x => x.Email == request.Email).Limit(1).FirstOrDefaultAsync();

            if(user is not null)
                return new(HttpStatusCode.Conflict, error: $"{user.Email} belongs to another account!"); */

            //To-Do: Ensure that an administrator can only belong to one business

            if(string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 6)
                return new(HttpStatusCode.BadRequest, error: $"Password must be at least 6 charcters long!");

            var hash = await _passwordService.GenerateHash(request.Password);

            Business business = new()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                TradingName = request.TradingName,
                TelephoneNumber = request.TelephoneNumber,
                TradingAddress = request.TradingAddress,
                CompanyType = request.CompanyType,
                Category = request.Category,
                AcceptCard = request.AcceptCard,
            };

            Staff admin = new(){
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = hash
            };

            admin.Companies.Add(new CompanyId(){
                Id = business.Id,
                Role= AdminRoles.Administrator,
                Permissions = new(),
            });

            await _businesses.InsertOneAsync(business);
            await _staffs.InsertOneAsync(admin);

            return await admin.GenerateTokens(AdminRoles.Administrator,_authService, _accessTokenModel, _refreshTokenModel, _refreshTokens);
        }
    }
}
