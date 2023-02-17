namespace ProcessX.Models;

public class ResponseResult : IResult
{
    private readonly Response _response;

    private ResponseResult(Response response)
    {
        _response = response;
    }
    public Task ExecuteAsync(HttpContext httpContext)
    {
        httpContext.Response.StatusCode = (int)_response.Status;

        if(_response is ResponseCode)
            return Task.CompletedTask;

        httpContext.Response.ContentType = MediaTypeNames.Application.Json;
        return httpContext.Response.WriteAsJsonAsync(_response);
    }

    public static implicit operator ResponseResult(Response response)
        => new (response);

    public static implicit operator Response(ResponseResult result)
        => result._response;
}
