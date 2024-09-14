using WebApiPW.Models;

namespace WebApiPW.Controllers
{
    public class CarritoItemDto
    {
        public int CarritoId { get; set; }
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public string UserId { get; set; }

    }
}