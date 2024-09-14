using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiPW.Models;
using WebApiTestv2.Models;

namespace WebApiPW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarritoController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public CarritoController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("addToCarrito")]
        public async Task<IActionResult> AddToCarrito([FromBody] CarritoItemDto carritoItemDto)
        {
            try
            {
                // Buscar el carrito del usuario o crear uno nuevo si no existe
                var carrito = await _dbContext.Carritos.FirstOrDefaultAsync(c => c.UserId == carritoItemDto.UserId);
                if (carrito == null)
                {
                    carrito = new Carrito { UserId = carritoItemDto.UserId };
                    await _dbContext.Carritos.AddAsync(carrito);
                    await _dbContext.SaveChangesAsync();
                }

                // Verificar si el producto ya está en el carrito
                var carritoItem = await _dbContext.CarritoItems
                    .FirstOrDefaultAsync(ci => ci.CarritoId == carrito.Id && ci.ProductoId == carritoItemDto.ProductoId);

                if (carritoItem != null)
                {
                    // Actualizar cantidad
                    carritoItem.Cantidad += carritoItemDto.Cantidad;
                }
                else
                {
                    // Agregar nuevo item al carrito
                    carritoItem = new CarritoItem
                    {
                        CarritoId = carrito.Id,
                        ProductoId = carritoItemDto.ProductoId,
                        Cantidad = carritoItemDto.Cantidad,
                        PrecioUnitario = carritoItemDto.PrecioUnitario
                    };
                    await _dbContext.CarritoItems.AddAsync(carritoItem);
                }

                // Actualizar stock del producto
                var producto = await _dbContext.Productos.FirstOrDefaultAsync(p => p.Id == carritoItemDto.ProductoId);
                if (producto == null || producto.Stock < carritoItemDto.Cantidad)
                {
                    return BadRequest("Stock insuficiente.");
                }
                producto.Stock -= carritoItemDto.Cantidad;

                await _dbContext.SaveChangesAsync();
                return Ok(carritoItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("getCarrito")]
        public async Task<IActionResult> GetCarrito(string userId)
        {
            try
            {
                var carrito = await _dbContext.Carritos
                    .FirstOrDefaultAsync(c => c.UserId == userId);

                
                if (carrito == null)
                    return NotFound("El carrito no existe.");
                var carritoItems = await _dbContext.CarritoItems.Include(ci => ci.Producto).Where(ci => ci.CarritoId == carrito.Id).ToArrayAsync();
                return Ok(carritoItems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpDelete("removeFromCarrito")]
        public async Task<IActionResult> RemoveFromCarrito(string userId, int productoId, int cantidad)
        {
            try
            {
                var carrito = await _dbContext.Carritos
                    .FirstOrDefaultAsync(c => c.UserId == userId);

                if (carrito == null)
                    return NotFound(new { message = "El carrito no existe." });

                var carritoItem = await _dbContext.CarritoItems
                    .FirstOrDefaultAsync(ci => ci.CarritoId == carrito.Id && ci.ProductoId == productoId);

                if (carritoItem == null)
                    return NotFound(new { message = "El producto no está en el carrito." });

                if (carritoItem.Cantidad <= cantidad)
                {
                    _dbContext.CarritoItems.Remove(carritoItem);
                }
                else
                {
                    carritoItem.Cantidad -= cantidad;
                }

                // Devolver stock
                var producto = await _dbContext.Productos.FirstOrDefaultAsync(p => p.Id == productoId);
                if (producto != null)
                {
                    producto.Stock += cantidad;
                }

                await _dbContext.SaveChangesAsync();
                return Ok(new { message = "Producto eliminado del carrito." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error: {ex.Message}" });
            }
        }
    }
}
