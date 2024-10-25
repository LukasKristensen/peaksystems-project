using System.ComponentModel.DataAnnotations;

namespace InventoryAPI.Models
{
    public class StockItem
    {
        public int Id { get; set; }

        [Required]
        public string ItemNumber { get; set; } = string.Empty; // Initialiser som tom streng

        [Required]
        public int Quantity { get; set; }

        [Required]
        public string Location { get; set; } = string.Empty; // Initialiser som tom streng
    }
}
