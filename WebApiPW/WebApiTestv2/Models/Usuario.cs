namespace WebApiTestv2.Models
{
    public class Usuario
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string correo { get; set; }
        public string contrasenia { get; set; }

        public ICollection<Producto> producto { get; set; }
    }
}
