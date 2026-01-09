using Microsoft.AspNetCore.Mvc;
using DigitalAssets.Api.Data;
using DigitalAssets.Api.Models;

namespace DigitalAssets.Api.Controllers;

[ApiController]
[Route("api/assets")]
public class DigitalAssetsController : ControllerBase
{
    private readonly AppDbContext _context;

    public DigitalAssetsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAssets()
    {
        return Ok(_context.DigitalAssets.OrderBy(a => a.Timestamp));
    }

    [HttpPost]
    public IActionResult AddAsset(DigitalAsset asset)
    {
        _context.DigitalAssets.Add(asset);
        _context.SaveChanges();
        return Ok(asset);
    }
}
