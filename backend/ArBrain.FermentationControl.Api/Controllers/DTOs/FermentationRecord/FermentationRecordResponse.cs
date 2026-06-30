using ArBrain.FermentationControl.Domain.Enums;

namespace ArBrain.FermentationControl.Api.DTOs.FermentationRecord;

public class FermentationRecordResponse
{
    public Guid Id { get; set; }
    public DateTime RecordedAt { get; set; }
    public string BatchNumber { get; set; } = string.Empty;
    public decimal Temperature { get; set; }
    public decimal Ph { get; set; }
    public decimal Extract { get; set; }
    public string? Observation { get; set; }
    public FermentationStatus Status { get; set; }

    public Guid BeerId { get; set; }
    public string BeerName { get; set; } = string.Empty;

    public Guid TankId { get; set; }
    public string TankName { get; set; } = string.Empty;
}