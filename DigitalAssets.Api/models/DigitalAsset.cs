namespace DigitalAssets.Api.Models;

public class DigitalAsset
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal MarketCap { get; set; }
    public DateTime Timestamp { get; set; }
}
