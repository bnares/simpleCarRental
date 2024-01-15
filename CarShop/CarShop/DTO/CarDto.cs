using System.ComponentModel.DataAnnotations;

namespace CarShop.DTO
{
    public class CarDto
    {
        public string Name { get; set; }
        
        public string Brand { get; set; }
        
        public int ProductionYear { get; set; }
       
        public int Odometer { get; set; }
        
        public int HorsePower { get; set; }

        public decimal Price { get; set; }
        public string PictureName { get; set; }
    }
}
