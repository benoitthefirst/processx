namespace ProcessX
{
    internal static class ConfigAuthPolicies
    {
        public const string RefreshTokenPolicy = nameof(RefreshTokenPolicy);
        public const string AccessTokenPolicy = nameof(AccessTokenPolicy);
        public const string AdminTokenPolicy = nameof(AdminTokenPolicy);
        public const string AdminManagerTokenPolicy = nameof(AdminManagerTokenPolicy);
        public const string AdminViewerTokenPolicy = nameof(AdminViewerTokenPolicy);

        public static class Roles
        {
            public const string RefreshToken = nameof(RefreshToken);
            public const string AccessToken = nameof(AccessToken);
            public const string AdminToken = nameof(AdminToken);
            public const string AdminManagerToken = nameof(AdminManagerToken);
            public const string AdminViewerToken = nameof(AdminViewerToken);
        }
    }
    internal static class ProcessXRoles
    {
        public const string Admin = nameof(Admin);
        public const string Manager = nameof(Manager);
        public const string Store = nameof(Store);

    }

    internal static class ProcessXAdminRoles
    {
        public const string Administrator = nameof(Administrator);
        public const string Manager = nameof(Manager);
        public const string Viewer = nameof(Viewer);

    }
}
