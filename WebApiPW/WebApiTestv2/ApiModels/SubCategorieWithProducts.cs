using WebApiPW.Models;
using WebApiTestv2.Models;

namespace WebApiPW.ApiModels
{
    public class SubCategorieWithProducts
    {
        public SubCategoria SubCategoria { get; set; }
        public List<Producto> Products { get; set; }
    }
}
