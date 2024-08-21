using Microsoft.AspNetCore.Identity;

namespace WebApiTestv2.ApiModels
{
    public class TokenModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public IdentityUser? LogedUser { get; set; }
    }
}
