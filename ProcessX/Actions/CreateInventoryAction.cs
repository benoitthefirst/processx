namespace ProcessX.Actions
{
    public class CreateInventoryAction : IAction<CreateInventoryRequest>
    {

        private readonly IMongoCollection<Inventory> _products;

        public CreateInventoryAction(
            CollectionProvider<Inventory> productsCollectionProvider)
        {
            _products = productsCollectionProvider.GetCollection();
        }

        public async Task<Response> PerformAction(CreateInventoryRequest request)
        {
            if(!request.IsValidRequest)
                return new("Invalid request",HttpStatusCode.BadRequest);

            Inventory product = new()
            {
                Name = request.Name,
                Price = request.Price,
                CostPrice = request.CostPrice,
                Currency = request.Currency,
                Description = request.Description,
                Thubnail = request.Thubnail,
                StockTracking = request.StockTracking,
                VariantLevel = request.VariantLevel,
                LowStockLevel = request.LowStockLevel,
                AskForPrice = request.AskForPrice,
                Quantity = request.Quantity,
                QauntityUnits = request.QauntityUnits,
                CategoryId = request.CategoryId,
                BrandId = request.BrandId,
                LeadTime = request.LeadTime
            };

            if(request.VariantLevel){
                product.Variants = request.Variants;

                if(request.Colors?.Count > 0)
                    product.Colors = request.Colors;

                if(request.Materials?.Count > 0)
                    product.Materials = request.Materials;
            }

            if(request.Thubnail is null)
                product.Thubnail = new(){
                    Value = request.Name.Substring(0,2),
                    Color = "#005B95",
                    Type = ThumbnailType.Abbriviation
                };

            if(request.Images?.Count > 0){
                //To-Do: Image uploading....
                product.Images = request.Images;
            }

            if(string.IsNullOrWhiteSpace(request.Sku)){
                //To-Do: Generate Sku
                product.Sku = "p".GenerateSku();
            }else{
                product.Sku = request.Sku;
            }

            product.CompanyId = "63f1e168b9182c16dbb319e7";

            await _products.InsertOneAsync(product);

            return new(product);
        }
    }
}
