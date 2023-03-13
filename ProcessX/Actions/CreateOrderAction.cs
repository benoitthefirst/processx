using HandlebarsDotNet;
using SFile = System.IO.File;
namespace ProcessX.Actions
{
    public class CreateOrderAction : IAction<CreateOrderRequest>
    {
        private readonly IMongoCollection<Order> _orders;
        private readonly ILogger<GetInventoriesAction> _logger;
        private readonly IEmailService emailService;
        public CreateOrderAction(
            CollectionProvider<Order> ordersCollectionProvider,
            ILogger<GetInventoriesAction> logger,
            IEmailService emailService)
        {
            _orders = ordersCollectionProvider.GetCollection();
            _logger = logger;
            this.emailService = emailService;
        }
        public async Task<Response> PerformAction(CreateOrderRequest request)
        {
            //TO-DO
            //seriliaze the data to generate a signiture
            //that we will compare with signiture sent
            //from the frontend
            //send order email to admin
            //send order received email to customer
            //Save to database

            if (!request.IsValidRequest)
                return new("Invalid request", HttpStatusCode.BadRequest);

            Order order = new()
            {
                Sku = "p".GenerateSku(),
                CompanyId = request.BusinessId,
                Status = OrderStatus.ItemPlaced,
                ContactInfo = request.ContactInfo,
                ShippingAddress = request.ShippingAddress,
                PaymentMethod = request.PaymentMethod,
                Products = request.Products,
                LastUpdated = DateTime.UtcNow,
            };

            //await _orders.InsertOneAsync(order);

            //To - Do: Send Email to customer and Admin.
            string orderTemplate = SFile.ReadAllText(string.Format(@"EmailTemplate/{0}.html", "Order"));
            Handlebars.RegisterTemplate("order", orderTemplate);

            string ordersTemplate = SFile.ReadAllText(string.Format(@"EmailTemplate/{0}.html", "Orders"));

            var template = Handlebars.Compile(ordersTemplate);

            var data = new
            {
                orders = order.Products
            };

            var subtotal = order.Products.Sum(x =>
            {
                decimal.TryParse(x.Price, out var _price);

                return _price;
            });


            var _shippingCost = order.ShippingAddress.DeliveryMethod.Price;
            decimal.TryParse(_shippingCost, out var _deliveryFee);


            var currency = order.Products.FirstOrDefault().Currency;
            var total = subtotal + _deliveryFee;

            var ordersHtml = template(data);
            UserEmailOptions emailOptions = new()
            {
                ToEmails = new() { order.ContactInfo.Email },
                PlaceHolders = new()
                {
                    new("{{sku}}", order.Sku),
                    new("{{FullName}}", order.ContactInfo.ToFullName()),
                    new("{{orderStatus}}", order.Status.ToString()),
                    new("{{lastUpdated}}", order.LastUpdated?.ToString("dddd, dd MMMM yyyy")),
                    new("{{shippingAddress.street}}", order.ShippingAddress.Street),
                    new("{{shippingAddress.suburb}}", order.ShippingAddress.Suburb),
                    new("{{shippingAddress.city}}", order.ShippingAddress.City),
                    new("{{shippingAddress.postalCode}}", order.ShippingAddress.PostalCode.ToString()),
                    new("{{shippingAddress.country}}", order.ShippingAddress.Country),
                    new("{{shippingAddress.deliveryMethod.name}}", order.ShippingAddress.DeliveryMethod.Name),
                    new("{{shippingAddress.deliveryMethod.price}}", order.ShippingAddress.DeliveryMethod.Price),
                    new("{{shippingAddress.deliveryMethod.deliveryNote}}", order.ShippingAddress.DeliveryMethod.DeliveryNote ?? "No delivery note"),
                    new("{{contactInfo.contactNumber}}", order.ContactInfo.MobileNumber),
                    new("{{paymentMethod.name}}", order.PaymentMethod.Name),
                    new("{{paymentMethod.price}}", $"{currency} {total}"),
                    new("{{orders}}", ordersHtml),
                    new("{{paymentSummary.subtotal}}", $"{currency} {subtotal}"),
                    new("{{paymentSummary.delivery}}", $"{currency} {_deliveryFee}"),
                    new("{{paymentSummary.total}}", $"{currency} {total}"),
                    new("{{bank.bankName}}", Configs.BankName),
                    new("{{bank.accountType}}", Configs.AccountType),
                    new("{{bank.accountName}}", Configs.AccountName),
                    new("{{bank.accountNumber}}", Configs.AccountNumber),
                    new("{{bank.branchCode}}", Configs.BranchCode),
                    new("{{bank.swiftCode}}", Configs.SwiftCode),
                    new("{{contactInfo.firstName}}", order.ContactInfo.FirstName),
                    new("{{contactInfo.lastName}}", order.ContactInfo.LastName),
                    new("{{contactInfo.email}}", order.ContactInfo.Email),
                    new("{{contactInfo.contactNumber}}", order.ContactInfo.MobileNumber),
                    new("{{contactInfo.company}}", order.ContactInfo.Company),
                }
            };


            await emailService.SendTestemail(emailOptions).ConfigureAwait(false);

            return new(order, HttpStatusCode.OK);
        }
    }
}
