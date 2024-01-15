using Microsoft.AspNetCore.Identity;

namespace CarShop.Entities
{
    public class User : IdentityUser<int>
    {
        public List<RentedData> RentedInfo { get; set; } = new List<RentedData>();
    }
}
