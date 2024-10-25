using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InventoryAPI.Data;
using InventoryAPI.Models;

namespace InventoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockItemsController : ControllerBase
    {
        private readonly InventoryContext _context;

        public StockItemsController(InventoryContext context)
        {
            _context = context;
        }

        // GET: api/StockItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockItem>>> GetStockItems()
        {
            return await _context.StockItems.ToListAsync();
        }

        // GET: api/StockItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockItem>> GetStockItem(int id)
        {
            var stockItem = await _context.StockItems.FindAsync(id);
            if (stockItem == null)
            {
                return NotFound();
            }
            return stockItem;
        }

        // POST: api/StockItems
        [HttpPost]
        public async Task<ActionResult<StockItem>> PostStockItem(StockItem stockItem)
        {
            _context.StockItems.Add(stockItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetStockItem", new { id = stockItem.Id }, stockItem);
        }

        // PUT: api/StockItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockItem(int id, StockItem stockItem)
        {
            if (id != stockItem.Id)
            {
                return BadRequest();
            }
            _context.Entry(stockItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/StockItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockItem(int id)
        {
            var stockItem = await _context.StockItems.FindAsync(id);
            if (stockItem == null)
            {
                return NotFound();
            }
            _context.StockItems.Remove(stockItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
