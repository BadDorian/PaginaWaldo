namespace WebApiPW.Models
{
    public class TipoProducto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public List<SubCategoria> SubCategorias { get; set; }
    }
}
