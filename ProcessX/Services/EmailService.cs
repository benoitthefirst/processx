using System.Net.Mail;

namespace ProcessX.Services
{
    public class EmailService : IEmailService
    {
        private const string TemplatePath = @"EmailTemplate/{0}.html";
        private readonly SMTPConfigModel _smtpConfig;
        private readonly SmtpClient smtpClient;
        public Task SendTestemail(UserEmailOptions userEmailOptions)
        {
            throw new NotImplementedException();
        }
    }
}
