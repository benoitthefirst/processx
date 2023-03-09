Env.Load();
Console.WriteLine($"DBHost: {Configs.DbHost}");
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    /* options.SerializerOptions.IncludeFields = true; */
    options.SerializerOptions.Converters.Insert(0, new JsonStringEnumConverter());
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000",
                "https://processx.theprocesse.com",
                "https://crochicx.co.za").AllowAnyMethod().AllowAnyHeader();
        }
    );
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IPasswordService, Argon2PasswordService>();
builder.Services.AddSingleton<IAction<RegisterRequest>, RegisterAction>();
builder.Services.AddSingleton<IAction<CreateInventoryRequest>, CreateInventoryAction>();
builder.Services.AddSingleton<IAction<GetInventoriesRequest>, GetInventoriesAction>();
builder.Services.AddSingleton<IAction<CreateOrderRequest>, CreateOrderAction>();
builder.Services.AddSingleton<IAction<GetOrdersRequest>, GetOrdersAction>();
builder.Services.AddSingleton<IAction<GetOrderStatusRequest>, GetOrderStatusAction>();
builder.Services.AddSingleton<IMongoDatabase>((sp) =>
{
    //var clientSettings = new MongoClientSettings() { };
    var clientSettings = MongoClientSettings.FromConnectionString(Configs.DbHost);

    // checking that credentials were provided
    if (!string.IsNullOrWhiteSpace(Configs.DbUsername) && !string.IsNullOrWhiteSpace(Configs.DbUserPassword))
    {
        var mongoCred = MongoCredential.CreateCredential(Configs.DbAuthDb, Configs.DbUsername, Configs.DbUserPassword);
        clientSettings.Credential = mongoCred;
    }
    var client = new MongoClient(clientSettings);
    return client.GetDatabase(Configs.DbName);
});

builder.Services.AddSingleton<IAuthService>(sp =>
    new JwtAuthService(Configs.JwtIssuer,
    Configs.JwtAudience,
    Configs.JwtValidateIssuer,
    Configs.JwtValidateAudience));

builder.Services.AddTransient<IAuthContainerModel>(sp =>
    new JwtContainerModel(Configs.JwtAccessTokenSecretKey,
    Configs.JwtSecurityAlgorithm,
    Configs.JwtAccessTokenExpiresIn));

builder.Services.AddTransient<IAuthRefreshTokenContainerModel>(sp =>
    new JwtContainerModel(Configs.JwtRefreshTokenSecretKey,
    Configs.JwtSecurityAlgorithm,
    Configs.JwtRefreshTokenExpiresIn));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddScheme<JwtBearerOptions, JwtAuthenticationHandlerAuth>(JwtBearerDefaults.AuthenticationScheme, default);

builder.Services.AddAuthorization(config =>
{
    config.AddPolicy(ConfigAuthPolicies.RefreshTokenPolicy, policyBuilder =>
    {
        policyBuilder.RequireClaim(ClaimTypes.Role);
        policyBuilder.RequireRole(ConfigAuthPolicies.Roles.RefreshToken);
    });

    config.AddPolicy(ConfigAuthPolicies.AccessTokenPolicy, policyBuilder =>
    {
        policyBuilder.RequireClaim(ClaimTypes.Role);
        policyBuilder.RequireRole(ConfigAuthPolicies.Roles.AccessToken);
    });

    config.AddPolicy(ConfigAuthPolicies.AdminViewerTokenPolicy, policyBuilder =>
    {
        policyBuilder.RequireClaim(ClaimTypes.Role);
        policyBuilder.RequireRole(
        ConfigAuthPolicies.Roles.AdminToken,
        ConfigAuthPolicies.Roles.AdminManagerToken,
        ConfigAuthPolicies.Roles.AdminViewerToken);
    });
});
builder.Services.AddSingleton(typeof(CollectionProvider<>));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapActions();

app.MapGet("/time", () =>
{
    return Results.Ok(DateTime.UtcNow);
})
.WithName("time");

app.Run();