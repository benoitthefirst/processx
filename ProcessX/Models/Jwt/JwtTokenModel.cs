namespace ProcessX.Models.Jwt
{
    public record JwtTokenModel(JwtToken RefreshToken, JwtToken AccessToken);
}
