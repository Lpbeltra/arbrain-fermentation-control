using System.ComponentModel.DataAnnotations;

namespace ArBrain.FermentationControl.Api.DTOs.FermentationRecord;

public class CreateFermentationRecordRequest
{
    [Required]
    public Guid BeerId { get; set; }

    [Required]
    public Guid TankId { get; set; }

    [Required]
    public string BatchNumber { get; set; } = string.Empty;

    [Range(-10, 50)]
    public decimal Temperature { get; set; }

    [Range(-10, 50)]
    public decimal Ph { get; set; }

    [Required]
    public decimal Extract { get; set; }

    public string? Observation { get; set; }
}