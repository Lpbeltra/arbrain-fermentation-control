using ArBrain.FermentationControl.Api.DTOs.FermentationRecord;
using ArBrain.FermentationControl.Domain.Entities;
using ArBrain.FermentationControl.Domain.Services;
using ArBrain.FermentationControl.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArBrain.FermentationControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FermentationRecordController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly FermentationEvaluator _evaluator;

    public FermentationRecordController(AppDbContext context, FermentationEvaluator evaluator)
    {
        _context = context;
        _evaluator = evaluator;
    }

    [HttpPost]
    public async Task<ActionResult<FermentationRecordResponse>> Create(
        CreateFermentationRecordRequest request)
    {
        var beer = await _context.Beers.FindAsync(request.BeerId);

        if (beer is null)
            return NotFound("Beer not found.");

        var tank = await _context.Tanks.FindAsync(request.TankId);

        if (tank is null)
            return NotFound("Tank not found.");

        var record = new FermentationRecord
        {
            Id = Guid.NewGuid(),
            RecordedAt = DateTime.UtcNow,
            BatchNumber = request.BatchNumber,
            Temperature = request.Temperature,
            Ph = request.Ph,
            Extract = request.Extract,
            Observation = request.Observation,
            BeerId = request.BeerId,
            TankId = request.TankId
        };

        record.Status = _evaluator.Evaluate(beer, record);

        _context.FermentationRecords.Add(record);
        await _context.SaveChangesAsync();

        var response = new FermentationRecordResponse
        {
            Id = record.Id,
            RecordedAt = record.RecordedAt,
            BatchNumber = record.BatchNumber,
            Temperature = record.Temperature,
            Ph = record.Ph,
            Extract = record.Extract,
            Observation = record.Observation,
            Status = record.Status,
            BeerId = record.BeerId,
            BeerName = beer.Name,
            TankId = record.TankId,
            TankName = tank.Name
        };

        return CreatedAtAction(nameof(GetById), new { id = record.Id }, response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<FermentationRecordResponse>> GetById(Guid id)
    {
        var record = await _context.FermentationRecords
            .Include(r => r.Beer)
            .Include(r => r.Tank)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (record is null)
            return NotFound();

        var response = new FermentationRecordResponse
        {
            Id = record.Id,
            RecordedAt = record.RecordedAt,
            BatchNumber = record.BatchNumber,
            Temperature = record.Temperature,
            Ph = record.Ph,
            Extract = record.Extract,
            Observation = record.Observation,
            Status = record.Status,
            BeerId = record.BeerId,
            BeerName = record.Beer.Name,
            TankId = record.TankId,
            TankName = record.Tank.Name
        };

        return Ok(response);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FermentationRecordResponse>>> GetAll()
    {
        var records = await _context.FermentationRecords
            .Include(r => r.Beer)
            .Include(r => r.Tank)
            .OrderByDescending(r => r.RecordedAt)
            .Select(r => new FermentationRecordResponse
            {
                Id = r.Id,
                RecordedAt = r.RecordedAt,
                BatchNumber = r.BatchNumber,
                Temperature = r.Temperature,
                Ph = r.Ph,
                Extract = r.Extract,
                Observation = r.Observation,
                Status = r.Status,
                BeerId = r.BeerId,
                BeerName = r.Beer.Name,
                TankId = r.TankId,
                TankName = r.Tank.Name
            })
            .ToListAsync();

        return Ok(records);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateFermentationRecordRequest request)
    {
        var record = await _context.FermentationRecords.FindAsync(id);

        if (record is null)
            return NotFound();

        var beer = await _context.Beers.FindAsync(request.BeerId);

        if (beer is null)
            return NotFound("Beer not found.");

        var tank = await _context.Tanks.FindAsync(request.TankId);

        if (tank is null)
            return NotFound("Tank not found.");

        record.BeerId = request.BeerId;
        record.TankId = request.TankId;
        record.BatchNumber = request.BatchNumber;
        record.Temperature = request.Temperature;
        record.Ph = request.Ph;
        record.Extract = request.Extract;
        record.Observation = request.Observation;

        record.Status = _evaluator.Evaluate(beer, record);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var record = await _context.FermentationRecords.FindAsync(id);

        if (record is null)
            return NotFound();

        _context.FermentationRecords.Remove(record);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("batch/{batchNumber}")]
    public async Task<ActionResult<IEnumerable<FermentationRecordResponse>>> GetByBatchNumber(string batchNumber)
    {
        var records = await _context.FermentationRecords
            .Include(r => r.Beer)
            .Include(r => r.Tank)
            .Where(r => r.BatchNumber == batchNumber)
            .OrderBy(r => r.RecordedAt)
            .Select(r => new FermentationRecordResponse
            {
                Id = r.Id,
                RecordedAt = r.RecordedAt,
                BatchNumber = r.BatchNumber,
                Temperature = r.Temperature,
                Ph = r.Ph,
                Extract = r.Extract,
                Observation = r.Observation,
                Status = r.Status,
                BeerId = r.BeerId,
                BeerName = r.Beer.Name,
                TankId = r.TankId,
                TankName = r.Tank.Name
            })
            .ToListAsync();

        if (!records.Any())
            return NotFound("No records found for this batch number.");

        return Ok(records);
    }
}