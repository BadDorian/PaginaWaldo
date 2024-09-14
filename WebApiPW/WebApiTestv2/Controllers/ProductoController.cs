using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApiPW.ApiModels;
using WebApiPW.Models;
using WebApiTestv2.Models;

namespace WebApiPW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext; 
        public ProductoController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet("getAllProducto")]
        public async Task<IActionResult> GetAllProducto()
        {
            try
            {
                var products = await _dbContext.Productos.ToListAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                
                return BadRequest(ex);
            }
        }
        [HttpGet("getAllProductoAdmin")]
        public async Task<IActionResult> GetAllProductoAdmin()
        {
            try
            {
                var fullCategories = await _dbContext.TiposProductos
                   .Include(tp => tp.SubCategorias)
                       .ThenInclude(sc => sc.Productos)
                   .ToListAsync();

                if (fullCategories != null && fullCategories.Any())
                    return Ok(fullCategories);
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpGet("getAllSubCategories")]
        public async Task<IActionResult> GetAllSubCategories()
        {
            try
            {
                var subcategories = await _dbContext.SubCategorias.ToListAsync();
                return Ok(subcategories);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
        [HttpGet("getAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _dbContext.TiposProductos.ToListAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
        [HttpGet("getProductoById/{id}")]
        public async Task<IActionResult> getProductoById(int id)
        {
            try
            {
                var product = await _dbContext.Productos.Where(p => p.Id == id).FirstOrDefaultAsync();
                if (product != null) 
                    return Ok(product);
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpGet("getProductoBySubCategoryId/{subCategoryId}")]
        public async Task<IActionResult> getProductoByCategoryId(int subCategoryId)
        {
            try
            {
                
                var subcategorie = await _dbContext.SubCategorias.Include(p => p.Productos).Where(sc => sc.Id == subCategoryId).FirstOrDefaultAsync();
                
                if (subcategorie != null)
                    return Ok(subcategorie);
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpGet("getCompleteCategoryByProductId/{productId}")]
        public async Task<IActionResult> getCompleteCategoryByProductId(int productId)
        {
            try
            {
                var product = await _dbContext.Productos.Where(p => p.Id == productId).FirstOrDefaultAsync();
                var subCategoryProduct = await _dbContext.SubCategorias.Where(sc => sc.Id == product.SubCategoriaId).FirstOrDefaultAsync();
                var fullCategories = await _dbContext.TiposProductos.Where(fc => fc.Id == subCategoryProduct.TipoProductoId).FirstOrDefaultAsync();

                if (fullCategories != null)
                    return Ok(fullCategories);
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }


        [HttpGet("getCompleteCategoryBySubCatId/{subCategoryId}")]
        public async Task<IActionResult> getCompleteCategoryBySubCatId(int subCategoryId)
        {
            try
            {
                var product = await _dbContext.Productos.Where(p => p.SubCategoriaId == subCategoryId).ToListAsync();
                var subCategoryProduct = await _dbContext.SubCategorias.Where(sc => sc.Id == subCategoryId).FirstOrDefaultAsync();
                var fullCategories = await _dbContext.TiposProductos.Where(fc => fc.Id == subCategoryProduct.TipoProductoId).FirstOrDefaultAsync();

                if (fullCategories != null)
                    return Ok(fullCategories);
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpGet("getCompleteCategoryById/{categoryId}")]
        public async Task<IActionResult> getCompleteCategoryById(int categoryId)
        {
            try
            {
                var subCategoryProduct = await _dbContext.SubCategorias.Include(sc => sc.Productos).Where(sc => sc.TipoProductoId == categoryId).ToListAsync();
                var fullCategories = await _dbContext.TiposProductos.Where(fc => fc.Id == categoryId).FirstOrDefaultAsync();

                if (fullCategories != null)
                    return Ok(fullCategories);
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpPost("createProducto")]
        public async Task<IActionResult> CreateProducto([FromBody]Product producto)
        {
            try
            {
                var existProduct = await _dbContext.Productos.FirstOrDefaultAsync(x => x.Codigo == producto.code);
                if (existProduct == null)
                {
                    string cleanBase64 = producto.image.Substring(producto.image.IndexOf(",") + 1);
                    byte[] byteArray = Convert.FromBase64String(cleanBase64);
                    var newProduct = new Producto
                    {
                        Nombre = producto.name,
                        Precio = producto.price,
                        Descripcion = producto.description,
                        ImgProduct = byteArray,
                        Stock = producto.stock,
                        Codigo = producto.code,
                        SubCategoriaId = producto.type
                    };

                    await _dbContext.Productos.AddAsync(newProduct);
                    await _dbContext.SaveChangesAsync();
                    return Ok();
                }
                return Ok(existProduct);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
        [HttpPut("updateProducto")]
        public async Task<IActionResult> UpdateProducto([FromBody] Product updatedProduct)
        {
            try
            {
                if (updatedProduct != null) {
                    var existProduct = await _dbContext.Productos.FirstOrDefaultAsync(x => x.Codigo == updatedProduct.code);
                    if (existProduct != null) {
                        string cleanBase64 = updatedProduct.image.Substring(updatedProduct.image.IndexOf(",") + 1);
                        byte[] byteArray = Convert.FromBase64String(cleanBase64);
                        existProduct.ImgProduct = byteArray;
                        existProduct.Descripcion = updatedProduct.description;
                        existProduct.Precio = updatedProduct.price;
                        existProduct.Stock = updatedProduct.stock;
                        
                        await _dbContext.SaveChangesAsync();
                        return Ok(existProduct);
                    }
                    return NoContent();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpDelete("deleteProducto/{Id}")]
        public async Task<IActionResult> DeleteProducto( int Id)
        {
            try
            {
                if (Id != 0 )
                {
                    var productToDelete = await _dbContext.Productos.Where(x => x.Id == Id).FirstOrDefaultAsync();
                    if (productToDelete != null)
                    {
                         _dbContext.Productos.Remove(productToDelete);
                        await _dbContext.SaveChangesAsync();
                        return Ok();
                    }
                    return NotFound();
                   
                }
                return BadRequest();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }


    }
}
