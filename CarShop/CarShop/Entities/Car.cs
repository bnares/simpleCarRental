using System.ComponentModel.DataAnnotations;

namespace CarShop.Entities
{
    public class Car
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage ="Brand is required")]
        public string Brand { get; set; }
        [Required(ErrorMessage ="Production year is required")]
        public int ProductionYear { get; set; }
        [Required(ErrorMessage ="Odometer is Required")]
        public int Odometer { get; set; }
        [Required(ErrorMessage ="Horse powere is required")]
        public int HorsePower { get; set; }

        public decimal Price { get; set; }
        public bool IsRented { get; set; } = false;
        [Required(ErrorMessage = "Picture name is required")]
        public string PictureName { get; set; }

        public int CarShopId { get; set; } = 1;
        public CarShop CarShop { get; set; }

    }
}
