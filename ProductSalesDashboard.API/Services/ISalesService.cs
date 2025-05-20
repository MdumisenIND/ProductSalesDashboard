using ProductSalesDashboard.API.Models;

namespace ProductSalesDashboard.API.Services
{
    public interface ISalesService
    {
        Task<List<Sale>> GetAllSalesAsync();
        Task<List<Sale>> GetFilteredSalesAsync(int? productId, DateTime? startDate, DateTime? endDate, int page, int pageSize);
    }
}
