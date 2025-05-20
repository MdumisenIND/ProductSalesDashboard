using ProductSalesDashboard.API.Data;
using ProductSalesDashboard.API.Models;
using System.Text.Json;

namespace ProductSalesDashboard.API.Services
{
    public class SalesService : ISalesService
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;
        private readonly IProductService _productService;

        public SalesService(AppDbContext context, HttpClient httpClient, IProductService? productService)
        {
            _context = context;
            _httpClient = httpClient;
            _productService = productService;
        }

        public async Task<List<Sale>> GetAllSalesAsync()
        {
            if (_context.Sales.Any())
                return _context.Sales.ToList();

            var products = await _productService.GetProductsAsync();

            var allSales = new List<Sale>();

            foreach (var product in products)
            {
                var response = await _httpClient.GetAsync($"/product-sales?Id={product.ProductId}");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var sales = JsonSerializer.Deserialize<List<Sale>>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (sales == null) continue;

                allSales.AddRange(sales);
            }

            _context.Sales.AddRange(allSales);
            await _context.SaveChangesAsync();

            return allSales;
        }

        public async Task<List<Sale>> GetFilteredSalesAsync(int? productId, DateTime? startDate, DateTime? endDate, int page, int pageSize)
        {
            await GetAllSalesAsync();

            var query = _context.Sales.AsQueryable();

            if (productId.HasValue)
                query = query.Where(s => s.ProductId == productId.Value);

            if (startDate.HasValue)
                query = query.Where(s => s.SaleDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(s => s.SaleDate <= endDate.Value);

            return query
                .OrderByDescending(s => s.SaleDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }
    }
}
