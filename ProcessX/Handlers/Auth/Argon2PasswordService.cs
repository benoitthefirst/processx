namespace ProcessX.Handlers.Auth
{
    internal class Argon2PasswordService : IPasswordService
    {
        private static IPasswordGenerator _passwordGenerator;
        public Argon2PasswordService()
        {
            _passwordGenerator = FluentHashing.Create()
            .WithAlgorithm(Configs.ArgonHashAlgorithm.FromStringPasswordHashAlgorithm())
            .WithHashLength(Configs.ArgonHashLength)
            .WithMemorySize(Configs.ArgonMemoryCost)
            .WithSaltLength(Configs.ArgonSaltLength)
            .WithDegreeOfParallelism(Configs.ArgonParallelismFactor)
            .WithIterations(Configs.ArgonIterations).Generator();
        }

        public Task<string> GenerateHash(string password)
            => _passwordGenerator.Generate(password);

        public Task<bool> VerifyPassword(string hash, string password)
            => _passwordGenerator.VerifyPassword(hash, password);
    }
}
