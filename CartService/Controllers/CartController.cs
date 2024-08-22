using CartService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CartService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartContext _context;

        public CartController(CartContext context)
        {
            _context = context;
        }

        [HttpPost("items")]
        public async Task<IActionResult> AddItemToCart([FromBody] CartItem item, string userId = null, string sessionId = null)
        {
            if (userId == null && sessionId == null)
            {
                return BadRequest("Either userId or sessionId must be provided.");
            }

            var cart = await _context.Carts.Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId || c.SessionId == sessionId);

            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = userId,
                    SessionId = sessionId,
                    Items = new List<CartItem>()
                };
                _context.Carts.Add(cart);
            }

            cart.Items.Add(item);
            await _context.SaveChangesAsync();

            return Ok(cart);
        }

        [HttpGet("items")]
        public async Task<IActionResult> GetCartItems(string userId = null, string sessionId = null)
        {
            if (userId == null && sessionId == null)
            {
                return BadRequest("Either userId or sessionId must be provided.");
            }

            var cart = await _context.Carts.Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId || c.SessionId == sessionId);

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart.Items);
        }

        [HttpDelete("items/{itemId}")]
        public async Task<IActionResult> RemoveItemFromCart(int itemId, string userId = null, string sessionId = null)
        {
            if (userId == null && sessionId == null)
            {
                return BadRequest("Either userId or sessionId must be provided.");
            }

            var cart = await _context.Carts.Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId || c.SessionId == sessionId);

            if (cart == null)
            {
                return NotFound();
            }

            var item = cart.Items.FirstOrDefault(i => i.CartItemId == itemId);

            if (item == null)
            {
                return NotFound();
            }

            cart.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(cart);
        }
    }
}
