using WebApiPW.Models;

namespace WebApiPW.ApiModels
{
    public class Product
    {
       
        public int id { get; set; }
        public string name { get; set; }
        public int code { get; set; }
        public int price { get; set; }
        public int stock { get; set; }
        public string? image { get; set; }
        public string? description { get; set; }
        public int type { get; set; }
    }
}
