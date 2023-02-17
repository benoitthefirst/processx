using Amazon.Auth.AccessControlPolicy;
using System.Net;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace ProcessX.Models
{
    public class Response
    {
        private static JsonSerializerOptions serializerOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            Converters ={
                new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
            }
        };
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object Data { get; set; }
        public HttpStatusCode Status { get; set; } = HttpStatusCode.OK;
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Error { get; set; }

        [JsonIgnore]
        public bool IsSuccess => (int)Status >= 200 && (int)Status < 300;

        public Response()
        { }

        public Response(HttpStatusCode statusCode, string error = default, object data = default)
        {
            Status = statusCode;
            Error = error;
            Data = data;
        }

        public Response(string error, HttpStatusCode statusCode = HttpStatusCode.BadRequest, object data = default)
            : this(statusCode, error, data: data)
        { }

        public Response(object data, HttpStatusCode statusCode = HttpStatusCode.OK)
        : this(statusCode, data: data)
        { }

        public Response<T>? ToResponse<T>()
        {
            if (this is Response<T> typed)
            {
                return typed;
            }

            var copy = Response<T>.Copy(this);

            if (copy is null || copy.Data is not null)
                return copy;

            var data = Deserialize<T>();

            copy.Data = data;
            return copy;
        }

        public T? ToType<T>()
        {
            return Deserialize<T>();
        }

        private T? Deserialize<T>()
        {
            if (Data is JsonElement je)
                return je.Deserialize<T>(serializerOptions);

            var json = JsonSerializer.Serialize(Data, serializerOptions);
            return JsonSerializer.Deserialize<T>(json, serializerOptions);
        }

    }

    public class Response<T> : Response
    {
        public new T? Data
        {
            get => (T?)base.Data;
            set => base.Data = value;
        }

        public Response() : base()
        { }

        public Response(T? data, HttpStatusCode statusCode = HttpStatusCode.OK, string error = default)
        {
            Status = statusCode;
            Error = error;
            Data = data;
        }

        internal static Response<T>? Copy(Response data)
        {
            if (data is null) return null;

            if (data is Response<T> typed)
                return new(typed.Data, typed.Status, typed.Error);

            if (data.Data is T typedData)
                return new(typedData, data.Status, data.Error);


            return new(default, data.Status, data.Error);
        }

    }
}
