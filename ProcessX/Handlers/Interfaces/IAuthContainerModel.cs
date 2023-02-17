namespace ProcessX.Handlers.Interfaces
{
    public interface IAuthContainerModel
    {
        #region Members

        internal string SecretKey { get; }
        string SecurityAlgorithm => SecurityAlgorithms.HmacSha512Signature;
        long ExpiresIn { get; }
        IEnumerable<Claim>? Claims { get; }

        #endregion

        IAuthContainerModel WithSecretKey(string secretKey);
        IAuthContainerModel WithAlgorithm(string securityAlgorithm);
        IAuthContainerModel WithExpiresMinutes(long expires);
        IAuthContainerModel WithClaimes(IEnumerable<Claim>? claimes);

    }
}
