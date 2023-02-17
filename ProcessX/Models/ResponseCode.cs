namespace ProcessX.Models;

public class ResponseCode : Response
{
    public ResponseCode(HttpStatusCode statusCode = HttpStatusCode.OK)
    {
        Status = statusCode;
    }
}
