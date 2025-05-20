using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductSalesDashboard.API.Services;

namespace ProductSalesDashboard.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ISalesService _salesService;

        public ProductsController(IProductService productService, ISalesService salesService)
        {
            _productService = productService;
            _salesService = salesService;
        }

        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }

        // GET: api/products/summary
        [HttpGet("summary")]
        public async Task<IActionResult> GetProductSalesSummary()
        {
            var products = await _productService.GetProductsAsync();
            var sales = await _salesService.GetAllSalesAsync();

            var summary = products.Select(p => new
            {
                ProductId = p.ProductId,
                p.Description,
                TotalQuantitySold = sales
                    .Where(s => s.ProductId == p.ProductId)
                    .Sum(s => s.SaleQty),
                TotalRevenue = sales
                    .Where(s => s.ProductId == p.ProductId)
                    .Sum(s => s.SaleQty * s.SalePrice)
            });

            return Ok(summary);
        }
    }
}
