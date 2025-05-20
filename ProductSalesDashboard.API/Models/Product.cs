using Newtonsoft.Json;

namespace ProductSalesDashboard.API.Models
{
    public class Product
    {
        [JsonProperty("Id")]
        public int ProductId { get; set; }
        public string Description { get; set; }
        public decimal SalePrice { get; set; }
        public string Category { get; set; }
        public string Image { get; set; }

        public ICollection<Sale> Sales { get; set; }
    }
}
