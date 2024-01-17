using CarShop.DTO;
using CarShop.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CarShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="User")]
    public class UserController : ControllerBase
    {
        private readonly CarShopContext _context;
        //private readonly AuthController _authController;

        public UserController(CarShopContext context)
        {
            _context = context;
            //_authController = authController;
        }

        [HttpGet("getCar/{id}",Name ="GetCar")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if(car== null) { return NotFound(new ProblemDetails() { Title="No such Car"}); }
            return car;
        }

        [HttpGet("getAllCars")]
        public async Task<ActionResult<List<Car>>> GetAllCars()
        {
            
            var cars = await _context.Cars.ToListAsync();
            if(cars== null) { return NotFound(); }
            return cars;
        }

        [HttpPost("reserve-car")]
        
        public async Task<ActionResult<RentedData>> MakeReservation(ReserveCarDto dto)
        {
            if(dto.DateFrom.IsNullOrEmpty() || dto.DateTo.IsNullOrEmpty()) { return BadRequest(new ProblemDetails() { Title = "Fill in Dates" }); }
            var car = await _context.Cars.FindAsync(dto.CarId);
            if(car== null) { return NotFound("Car cant be found");}
            if (car.IsRented) { return BadRequest(new ProblemDetails { Title = "Car is Rented" }); }
            var carShop = await _context.CarShops.FindAsync(dto.CarShopId);
            if(carShop== null) { return NotFound("Cant find such car shop"); }
            var from = DateOnly.ParseExact(dto.DateFrom, "yyyy-MM-dd");
            var to = DateOnly.ParseExact(dto.DateTo, "yyyy-MM-dd");
            
            if (from > to )
            {
                return BadRequest(new ProblemDetails() { Title = "Date 'from' cant be after date 'to'" });
            }
            var userId = int.Parse(HttpContext.User.Claims.ToList()[2].Value);
            var price = (to.DayNumber - from.DayNumber) * car.Price;
            var rentedData = new RentedData { Car = car, CarId = car.Id, CarShop = carShop, CarShopId = carShop.Id, DateFrom = from.ToString("yyyy-MM-dd"), DateTo = to.ToString("yyyy-MM-dd"), Price = price, UserId = userId };
            _context.RentedDatas.Add(rentedData);
            //car.IsRented = true;
            var result = await _context.SaveChangesAsync();
            if(result>0) return CreatedAtRoute("GetReservation", new {Id = rentedData.Id}, rentedData);
            return BadRequest(new ProblemDetails() { Title = "Problem with reservation of the car" });
        }


        [HttpGet("your-reservation/{id}", Name ="GetReservation")]
        public async Task<ActionResult<RentedData>> GetRentedData(int id)
        {
            var reservation = await _context.RentedDatas.FindAsync(id);
            if (reservation == null) return NotFound(new ProblemDetails() { Title = "Cant find such reservation" });
            return Ok(reservation);
        }

        [HttpDelete("delete-reservation/{id}")]
        public async Task<ActionResult> DeleteReservation(int id)
        {
            var reservation = await _context.RentedDatas.FindAsync(id);
            if (reservation == null) return NotFound(new ProblemDetails() { Title = "No such reservation" });
            _context.RentedDatas.Remove(reservation);
            if(await _context.SaveChangesAsync()>0) return NoContent();
            return BadRequest(new ProblemDetails() { Title = "Cand save changes in DB" });
        }

        [HttpGet("all-reservation")]
        public async Task<ActionResult<List<RentedData>>> GetAllReservation()
        {
            var test = HttpContext.User;
            var userContext = HttpContext.User.Claims.ToList();
            if (userContext == null) return NotFound(new ProblemDetails() { Title = "No such user login" });
            try
            {
                var userId =int.Parse(userContext[2].Value);
                var user = await _context.Users.FindAsync(userId);
                if (user == null) return NotFound(new ProblemDetails() { Title = "No such user" });
                var rentedData = await _context.RentedDatas.Where(x=>x.UserId==userId).Include(x=>x.Car).Include(x=>x.User).ToListAsync();
                return Ok(rentedData);
            }
            catch(Exception e)
            {
                return BadRequest(new ProblemDetails() { Title = e.Message });
            }
        }
    }
}
