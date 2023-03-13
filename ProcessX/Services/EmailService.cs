//using System.Net.Mail;
using HandlebarsDotNet;
using MailKit.Net.Smtp;
using MimeKit;

namespace ProcessX.Services
{
    public class EmailService : IEmailService
    {
        private const string TemplatePath = @"EmailTemplate/{0}.html";
        private readonly SMTPConfigModel _smtpConfig;
        private readonly SmtpClient smtpClient;
        public async Task SendTestemail(UserEmailOptions userEmailOptions)
        {
            userEmailOptions.Subject = UpdatePlaceHolders("Your Crochicx order {{sku}} | Order Recieved", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody("NewOrder"), userEmailOptions.PlaceHolders);

            await SendEmail(userEmailOptions);
        }

        public EmailService(IOptions<SMTPConfigModel> smtpConfig)
        {
            _smtpConfig = smtpConfig.Value;

            // Configure MailKit
            smtpClient = new SmtpClient();
            smtpClient.Connect(_smtpConfig.Host, _smtpConfig.Port, true);
            smtpClient.Authenticate(_smtpConfig.Username, _smtpConfig.Password);
        }


        private async Task SendOrderReceived(UserEmailOptions userEmailOptions) 
        {
            userEmailOptions.Subject = UpdatePlaceHolders("Your Crochicx order {{sku}} | Order Recieved", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody("OrderReceived"), userEmailOptions.PlaceHolders);

        }
        private async Task SendNewOrder(UserEmailOptions userEmailOptions)
        {
            userEmailOptions.Subject = UpdatePlaceHolders("New Crochicx order {{sku}} | Order Recieved", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody("NewOrder"), userEmailOptions.PlaceHolders);

        }
        private async Task SendOrderCanceled(UserEmailOptions userEmailOptions)
        {
            userEmailOptions.Subject = UpdatePlaceHolders("Your Crochicx order {{sku}} | Order Cancelled", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody("OrderCancelled"), userEmailOptions.PlaceHolders);

        }
        private async Task SendOrderReminder(UserEmailOptions userEmailOptions)
        {
            userEmailOptions.Subject = UpdatePlaceHolders("Your Crochicx order {{sku}} | Awaiting Payment", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody("OrderReceived"), userEmailOptions.PlaceHolders);

        }
        private async Task SendPaymentReceived(UserEmailOptions userEmailOptions)
        {
            userEmailOptions.Subject = UpdatePlaceHolders("Your Crochicx order {{sku}} | Order Recieved", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody("OrderReceived"), userEmailOptions.PlaceHolders);
        }
        private async Task SendPromotionalEmail(UserEmailOptions userEmailOptions)
        {
            userEmailOptions.Subject = UpdatePlaceHolders("Your Crochicx order {{sku}} | Order Recieved", userEmailOptions.PlaceHolders);
            userEmailOptions.Body = UpdatePlaceHolders(GetEmailBody("OrderReceived"), userEmailOptions.PlaceHolders);
        }

        private async Task SendEmail(UserEmailOptions userEmailOptions)
        {
            // Generate the email content using Handlebars

            // Create a MIME message
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_smtpConfig.SenderDisplayName, _smtpConfig.SenderAddress));
            //message.To.Add(new MailboxAddress("Recipient Name", "recipient.email@example.com"));
            message.Subject = userEmailOptions.Subject;
            message.Body = new TextPart("html") { Text = userEmailOptions.Body };

            foreach (var toEmail in userEmailOptions.ToEmails)
            {
                //mail.To.Add(toEmail);
                message.To.Add(new MailboxAddress("Recipient Name", toEmail));
            }

            // Send the email
            smtpClient.Send(message);

            // Disconnect from the SMTP server
            smtpClient.Disconnect(true);
        }

        private string GetEmailBody(string templateName)
        {
            var body = File.ReadAllText(string.Format(TemplatePath, templateName));
            return body;
        }

        private string UpdatePlaceHolders(string text, List<KeyValuePair<string, string>> keyValuePairs)
        {
            if (!string.IsNullOrEmpty(text) && keyValuePairs != null)
            {
                foreach (KeyValuePair<string, string> placeHolder in keyValuePairs)
                {
                    if (text.Contains(placeHolder.Key))
                    {
                        text = text.Replace(placeHolder.Key, placeHolder.Value);
                    }
                }
            }

            return text;
        }
    }
}
