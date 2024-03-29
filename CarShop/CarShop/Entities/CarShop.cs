﻿namespace CarShop.Entities
{
    public class CarShop
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Car> Cars { get; set; } = new List<Car>();
        public List<RentedData> RentedCars { get; set; } = new List<RentedData> { };

    }
}
