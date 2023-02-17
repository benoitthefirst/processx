namespace ProcessX.Handlers.Interfaces
{
    public interface IPasswordService
    {
        Task<string> GenerateHash(string password);
        Task<bool> VerifyPassword(string hash, string password);
    }
}
