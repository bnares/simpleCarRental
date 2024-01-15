using CarShop.DTO;
using CarShop.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;

namespace CarShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class AdminController : ControllerBase
    {
        private readonly CarShopContext _context;

        public AdminController(CarShopContext context)
        {
            _context = context;
        }

        [HttpGet("allCars")]
        public async Task<ActionResult<List<Car>>> GetAllCars()
        {
            var cars = await _context.Cars.ToListAsync();
            return Ok(cars);
        }

        [HttpGet("car/{id}", Name ="GetCarById")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FirstOrDefaultAsync(x => x.Id == id);
            if (car == null) return NotFound(new ProblemDetails() { Title = "No such car" });
            return Ok(car);
        }

        [HttpPost("addCar")]
        public async Task<ActionResult<Car>> AddCar(CarDto dto)
        {
            if (dto == null || dto.PictureName.IsNullOrEmpty() || dto.Brand.IsNullOrEmpty() || dto.Name.IsNullOrEmpty() || dto.ProductionYear == 0 || dto.HorsePower==0 || dto.Price==0) return BadRequest(new ProblemDetails() { Title = "Fill in field" });
            var car = new Car();
            car.Brand = dto.Brand;
            car.Name = dto.Name;
            car.ProductionYear = dto.ProductionYear;
            car.PictureName = dto.PictureName;
            car.Price = dto.Price;
            car.HorsePower = dto.HorsePower;
            car.Odometer = dto.Odometer;
            car.CarShopId = 1;
            await _context.Cars.AddAsync(car);
            if(await _context.SaveChangesAsync()>0) return CreatedAtRoute("GetCarById", new { Id = car.Id}, car);
            return BadRequest(new ProblemDetails() { Title = "Cant add new car, sth happend" });
        }

        [HttpDelete("delete-car/{id}")]
        public async Task<ActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return BadRequest(new ProblemDetails() { Title = "No such car" });
            if (car.IsRented) return BadRequest(new ProblemDetails() { Title ="Car is rented"});
            _context.Cars.Remove(car);
            if (await _context.SaveChangesAsync() > 0) return NoContent();
            return BadRequest(new ProblemDetails() { Title = "sth went wrong with saving" });
        }

        [HttpGet("allRentedData")]
        public async Task<ActionResult<List<RentedData>>> GetAllRentedData()
        {
            var data = await _context.RentedDatas.OrderByDescending(x => x.DateTo).ToListAsync();
            return Ok(data);
        }

        [HttpPut("updateStatusOfCar/{id}")]
        public async Task<ActionResult<Car>> UpdateCarStatus(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null) return BadRequest(new ProblemDetails() { Title = "No such car" });
            car.IsRented = !car.IsRented;
            if(await _context.SaveChangesAsync()>0) return CreatedAtRoute("GetCarById", new { Id = car.Id }, car);
            return BadRequest(new ProblemDetails() { Title = "Cant save data, sth went wrong" });
        }
    }
}
