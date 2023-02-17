namespace ProcessX.Helpers.Extensions
{
    public static class ResponseExtensions
    {
        public static Response ToResponse(this ResponseResult result)
            => result;

        public static ResponseResult ToResult(this Response response)
            => response;
            
        public static async Task<Response> ToResponseTask(this Task<ResponseResult> resultTask)
            => await resultTask;

        public static async Task<ResponseResult> ToResultTask(this Task<Response> responseTask)
            => await responseTask;

        public static bool IsSuccessStatusCode(this Response response)
        {
            return response is not null && 200 <= (int)response.Status && (int)response.Status < 300;
        }

        public static bool IsValidValidationResult(this Response? response)
        {
            return response is null || response.IsSuccessStatusCode();
        }
    }
}
