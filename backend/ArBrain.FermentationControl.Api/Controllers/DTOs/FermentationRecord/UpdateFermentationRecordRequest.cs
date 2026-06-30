using System.ComponentModel.DataAnnotations;

namespace ArBrain.FermentationControl.Api.DTOs.FermentationRecord;

public class UpdateFermentationRecordRequest
{
    [Required]
    public Guid BeerId { get; set; }

    [Required]
    public Guid TankId { get; set; }

    [Required]
    public string BatchNumber { get; set; } = string.Empty;

    [Required]
    public decimal Temperature { get; set; }

    [Required]
    public decimal Ph { get; set; }

    [Required]
    public decimal Extract { get; set; }

    public string? Observation { get; set; }
}