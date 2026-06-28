using ArBrain.FermentationControl.Domain.Enums;

namespace ArBrain.FermentationControl.Domain.Entities;

public class FermentationRecord
{
    public Guid Id { get; set; }

    public Guid BeerId { get; set; }
    public Guid TankId { get; set; }

    public string BatchNumber { get; set; } = string.Empty;

    public decimal Temperature { get; set; }
    public decimal Ph { get; set; }
    public decimal Extract { get; set; }

    public DateTime RegisteredAt { get; set; }

    public string? Observations { get; set; }

    public FermentationStatus Status { get; set; }
}