namespace WebApiTestv2.ApiModels
{
    public class ChangePasswordModel
    {
        public string? Email { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
