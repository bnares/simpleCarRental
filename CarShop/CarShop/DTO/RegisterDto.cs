using System.ComponentModel.DataAnnotations;

namespace CarShop.DTO
{
    public class RegisterDto : LoginDto
    {
        [Required(ErrorMessage ="Email is required")]
        [EmailAddress]
        public string Email { get; set; }
       

    }
}
