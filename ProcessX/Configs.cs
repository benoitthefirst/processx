namespace ProcessX
{
    internal static class Configs
    {
        public static string AppName => GetEnv("applicationName", "SneakerHeads");
        public static decimal ServiceAmount => GetEnv(nameof(ServiceAmount))!.ToDecimal()!;
        public static decimal AuthenticationAmount => GetEnv(nameof(AuthenticationAmount))!.ToDecimal();
        #region Database Configs
        public static string DbName => GetEnv(nameof(DbName))!;
        public static string DbHost => GetEnv(nameof(DbHost))!;
        public static string DbAuthDb => GetEnv(nameof(DbAuthDb))!;
        public static string DbUsername => GetEnv(nameof(DbUsername))!;
        public static string DbUserPassword => GetEnv(nameof(DbUserPassword))!;

        #endregion

        #region Token Configs
        public static string PaymentAccessToken => GetEnv(nameof(PaymentAccessToken));
        public static string JwtAccessTokenSecretKey => GetEnv(nameof(JwtAccessTokenSecretKey));
        public static string JwtRefreshTokenSecretKey => GetEnv(nameof(JwtRefreshTokenSecretKey));
        public static string JwtSecurityAlgorithm => GetEnv(nameof(JwtSecurityAlgorithm), SecurityAlgorithms.HmacSha512Signature);
        public static long JwtAccessTokenExpiresIn => GetEnv(nameof(JwtAccessTokenExpiresIn)).GetTime("1W");
        public static long JwtRefreshTokenExpiresIn => GetEnv(nameof(JwtRefreshTokenExpiresIn)).GetTime("52W");
        public static string JwtIssuer => GetEnv(nameof(JwtIssuer));
        public static string JwtAudience => GetEnv(nameof(JwtAudience));
        public static bool JwtValidateIssuer => GetEnv(nameof(JwtValidateIssuer)).ToBool(true);
        public static bool JwtValidateAudience => GetEnv(nameof(JwtValidateAudience)).ToBool(true);

        #endregion

        #region Password Hashing
        public static int ArgonParallelismFactor => GetEnv(nameof(ArgonParallelismFactor)).ToInt(1);
        // in KB
        public static int ArgonMemoryCost => GetEnv(nameof(ArgonMemoryCost)).ToInt(16);
        public static int ArgonIterations => GetEnv(nameof(ArgonIterations)).ToInt(4);
        public static int ArgonSaltLength => GetEnv(nameof(ArgonSaltLength)).ToInt(16);
        public static int ArgonHashLength => GetEnv(nameof(ArgonHashLength)).ToInt(16);
        public static string ArgonHashAlgorithm => GetEnv(nameof(ArgonHashAlgorithm), "argon2id");
        #endregion

        #region Actor persistence

        public const string StorageProductOrder = "productOrderStore";

        #endregion

        #region Object Storage Configs

        public static string ObjectStorageAppFolder => GetEnv(nameof(ObjectStorageAppFolder), AppName);
        public static string ObjectStorageBucketName => GetEnv(nameof(ObjectStorageBucketName));
        public static string ObjectStorageAccessKey => GetEnv(nameof(ObjectStorageAccessKey));
        public static string ObjectStorageSecretKey => GetEnv(nameof(ObjectStorageSecretKey));
        public static string ObjectStorageEndpoint => GetEnv(nameof(ObjectStorageEndpoint));
        public static string BlobBaseUrl => GetEnv(nameof(BlobBaseUrl));

        #endregion


        #region Payfast Configs

        public static string PayfastPassphrase => GetEnv(nameof(PayfastPassphrase))!;
        public static int PayfastMerchantId => GetEnv(nameof(PayfastMerchantId))!.ToInt();
        public static string PayfastMerchantKey => GetEnv(nameof(PayfastMerchantKey))!;
        public static string PayfastReturnUrl => GetEnv(nameof(PayfastReturnUrl), PaymentNotificationBaseUrl + "/success");
        public static string PayfastCancelUrl => GetEnv(nameof(PayfastCancelUrl), PaymentNotificationBaseUrl + "/cancel");
        public static string PaymentNotificationBaseUrl => GetEnv(nameof(PaymentNotificationBaseUrl))!;
        public static bool PayfastIsSandbox => GetEnv(nameof(PayfastIsSandbox)).ToBool(true)!;

        #endregion

        public static string? GetEnv(string key)
        {
            return Environment.GetEnvironmentVariable(key);
        }

        public static void SetEnv(string key, string value, EnvironmentVariableTarget target)
            => Environment.SetEnvironmentVariable(key, value, target);

        public static string GetEnv(string key, string @default)
        {
            var value = GetEnv(key);
            return string.IsNullOrWhiteSpace(value) ? @default : value;
        }
    }
}
