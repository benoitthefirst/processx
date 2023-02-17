namespace ProcessX
{
    // Add services to the container.

    // Configure the HTTP request pipeline.
    public class CollectionProvider<T>
    {
        private readonly Lazy<IMongoCollection<T>> Collection;
        private readonly IMongoDatabase db;

        public IMongoCollection<T> GetCollection()
        {
            return Collection.Value;
        }

        public CollectionProvider(IMongoDatabase db)
        {
            this.db = db;
            Collection = new(() => db.GetCollection<T>(ParseClassName()));
        }

        private string ParseClassName()
        {
            var name = typeof(T).Name;

            var index = name.ToLowerInvariant().IndexOf("model");

            if (index == -1)
                return name;

            return name.Substring(0, index);
        }
    }

}
