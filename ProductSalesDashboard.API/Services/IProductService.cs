using ProductSalesDashboard.API.Models;

namespace ProductSalesDashboard.API.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetProductsAsync();
    }
}
