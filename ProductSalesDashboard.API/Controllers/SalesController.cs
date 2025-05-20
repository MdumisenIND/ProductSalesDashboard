using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductSalesDashboard.API.Services;

namespace ProductSalesDashboard.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISalesService _salesService;

        public SalesController(ISalesService salesService)
        {
            _salesService = salesService;
        }

        // GET: api/sales?productId=1&startDate=2025-04-24&endDate=2025-04-29&page=1&pageSize=5
        [HttpGet]
        public async Task<IActionResult> GetFilteredSales(
            [FromQuery] int? productId,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 5)
        {
            var sales = await _salesService.GetFilteredSalesAsync(productId, startDate, endDate, page, pageSize);
            return Ok(sales);
        }
    }
}
