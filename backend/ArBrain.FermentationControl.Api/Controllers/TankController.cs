using ArBrain.FermentationControl.Api.DTOs.Tank;
using ArBrain.FermentationControl.Domain.Entities;
using ArBrain.FermentationControl.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace ArBrain.FermentationControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TankController : ControllerBase
{
    private readonly AppDbContext _context;

    public TankController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Create(CreateTankRequest request)
    {
        var tank = new Tank
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            CapacityLiters = request.CapacityLiters
        };

        _context.Tanks.Add(tank);
        _context.SaveChanges();

        var response = new TankResponse
        {
            Id = tank.Id,
            Name = tank.Name,
            CapacityLiters = tank.CapacityLiters
        };

        return Created($"/api/tank/{tank.Id}", response);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var tanks = _context.Tanks
            .Select(t => new TankResponse
            {
                Id = t.Id,
                Name = t.Name,
                CapacityLiters = t.CapacityLiters
            })
            .ToList();

        return Ok(tanks);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var tank = _context.Tanks
            .Where(t => t.Id == id)
            .Select(t => new TankResponse
            {
                Id = t.Id,
                Name = t.Name,
                CapacityLiters = t.CapacityLiters
            })
            .FirstOrDefault();

        if (tank is null)
            return NotFound();

        return Ok(tank);
    }

    [HttpPut("{id}")]
    public IActionResult Update(Guid id, UpdateTankRequest request)
    {
        var tank = _context.Tanks.FirstOrDefault(t => t.Id == id);

        if (tank is null)
            return NotFound();

        tank.Name = request.Name;
        tank.CapacityLiters = request.CapacityLiters;

        _context.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var tank = _context.Tanks.FirstOrDefault(t => t.Id == id);

        if (tank is null)
            return NotFound();

        _context.Tanks.Remove(tank);
        _context.SaveChanges();

        return NoContent();
    }
}