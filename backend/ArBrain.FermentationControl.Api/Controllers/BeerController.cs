using ArBrain.FermentationControl.Api.DTOs.Beer;
using ArBrain.FermentationControl.Domain.Entities;
using ArBrain.FermentationControl.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace ArBrain.FermentationControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BeerController : ControllerBase
{
    private readonly AppDbContext _context;

    public BeerController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Create(CreateBeerRequest request)
    {
        var beer = new Beer
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Style = request.Style,
            MinTemperature = request.MinTemperature,
            MaxTemperature = request.MaxTemperature,
            MinPh = request.MinPh,
            MaxPh = request.MaxPh,
            MinExtract = request.MinExtract,
            MaxExtract = request.MaxExtract
        };

        _context.Beers.Add(beer);
        _context.SaveChanges();

        return Created($"/api/beer/{beer.Id}", beer);
    }
}