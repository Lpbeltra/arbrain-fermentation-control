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

    [HttpGet]
    public IActionResult GetAll()
    {
        var beers = _context.Beers
        .Select(b => new BeerResponse
        {
            Id = b.Id,
            Name = b.Name,
            Style = b.Style,
            MinTemperature = b.MinTemperature,
            MaxTemperature = b.MaxTemperature,
            MinPh = b.MinPh,
            MaxPh = b.MaxPh,
            MinExtract = b.MinExtract,
            MaxExtract = b.MaxExtract
        })
        .ToList();

        return Ok(beers);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var beer = _context.Beers
            .Where(b => b.Id == id)
            .Select(b => new BeerResponse
            {
                Id = b.Id,
                Name = b.Name,
                Style = b.Style,
                MinTemperature = b.MinTemperature,
                MaxTemperature = b.MaxTemperature,
                MinPh = b.MinPh,
                MaxPh = b.MaxPh,
                MinExtract = b.MinExtract,
                MaxExtract = b.MaxExtract
            })
            .FirstOrDefault();

        if (beer is null)
            return NotFound();

        return Ok(beer);
    }

    [HttpPut("{id}")]
    public IActionResult Update(Guid id, UpdateBeerRequest request)
    {
        var beer = _context.Beers.FirstOrDefault(b => b.Id == id);

        if (beer is null)
            return NotFound();

        beer.Name = request.Name;
        beer.Style = request.Style;
        beer.MinTemperature = request.MinTemperature;
        beer.MaxTemperature = request.MaxTemperature;
        beer.MinPh = request.MinPh;
        beer.MaxPh = request.MaxPh;
        beer.MinExtract = request.MinExtract;
        beer.MaxExtract = request.MaxExtract;

        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var beer = _context.Beers.FirstOrDefault(b => b.Id == id);

        if (beer is null)
            return NotFound();

        _context.Beers.Remove(beer);
        _context.SaveChanges();
        
        return NoContent();
    }
}