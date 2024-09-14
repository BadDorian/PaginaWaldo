using System.Reflection.Metadata;
using WebApiPW.Models;

namespace WebApiTestv2.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int Codigo { get; set; }
        public int Precio { get; set; }
        public int Stock { get; set; }
        public byte[]? ImgProduct { get; set; }
        public string? Descripcion { get; set; }
        public int SubCategoriaId { get; set; }

    }
}
