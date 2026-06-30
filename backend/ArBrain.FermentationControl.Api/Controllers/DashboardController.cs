using ArBrain.FermentationControl.Api.DTOs.Dashboard;
using ArBrain.FermentationControl.Domain.Enums;
using ArBrain.FermentationControl.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArBrain.FermentationControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<DashboardResponse>> Get()
    {
        var response = new DashboardResponse
        {
            TotalRecords = await _context.FermentationRecords.CountAsync(),

            InStandardRecords = await _context.FermentationRecords
                .CountAsync(r => r.Status == FermentationStatus.InStandard),

            WarningRecords = await _context.FermentationRecords
                .CountAsync(r => r.Status == FermentationStatus.Warning),

            OutOfStandardRecords = await _context.FermentationRecords
                .CountAsync(r => r.Status == FermentationStatus.OutOfStandard)
        };

        return Ok(response);
    }
}