using WebApiTestv2.Models;

namespace WebApiPW.Models
{
    public class SubCategoria
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public int TipoProductoId { get; set; }
       
        public List<Producto> Productos { get; set; }
    }
}
