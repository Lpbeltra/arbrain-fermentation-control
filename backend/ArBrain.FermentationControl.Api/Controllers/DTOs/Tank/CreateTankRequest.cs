using System.ComponentModel.DataAnnotations;

namespace ArBrain.FermentationControl.Api.DTOs.Tank;

public class CreateTankRequest
{
    [Required(ErrorMessage = "Informe o nome do tanque.")]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Range(1, 100000, ErrorMessage = "A capacidade deve ser maior que zero.")]
    public decimal CapacityLiters { get; set; }
}