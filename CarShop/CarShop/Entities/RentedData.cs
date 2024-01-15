namespace CarShop.Entities
{
    public class RentedData
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public Car Car { get; set; }
        public DateOnly DateFrom { get; set; } = new DateOnly();
        public DateOnly DateTo { get; set; } = new DateOnly();
        public decimal Price { get; set; }
        public int CarShopId { get; set; }
        public CarShop CarShop { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

    }
}
