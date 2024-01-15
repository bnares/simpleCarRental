using System.ComponentModel.DataAnnotations;

namespace CarShop.DTO
{
    public class LoginDto
    {
        [Required(ErrorMessage ="Namr is required")]
        public string Username { get; set; }
        [Required(ErrorMessage ="Password is required")]
        public string Password { get; set; }

    }
}
