using ProductSalesDashboard.API.Data;
using ProductSalesDashboard.API.Models;
using System.Text.Json;

namespace ProductSalesDashboard.API.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;

        public ProductService(AppDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            if (_context.Products.Any())
                return _context.Products.ToList();

            var response = await _httpClient.GetAsync("/products");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var products = JsonSerializer.Deserialize<List<Product>>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            _context.Products.AddRange(products);
            await _context.SaveChangesAsync();

            return products;
        }
    }
}
