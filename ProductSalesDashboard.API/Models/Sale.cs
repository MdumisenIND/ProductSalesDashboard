namespace ProductSalesDashboard.API.Models
{
    public class Sale
    {
        //public int Id { get; set; }
        public int SaleId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public decimal SalePrice { get; set; }
        public int SaleQty { get; set; }
        public DateTime SaleDate { get; set; }

        public decimal TotalAmount => SalePrice * SaleQty;
    }
}
