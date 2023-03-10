namespace ProcessX.Services
{
    public interface IEmailService
    {
        Task SendTestemail(UserEmailOptions userEmailOptions);
    }
}
