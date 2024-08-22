namespace CartService.Models
{
    public class Cart
    {
        
        public int CartId { get; set; }
        public string UserId { get; set; }  // Nullable to allow anonymous users
        public string SessionId { get; set; }  // For anonymous users
        public List<CartItem> Items { get; set; } = new List<CartItem>();
    }
}
