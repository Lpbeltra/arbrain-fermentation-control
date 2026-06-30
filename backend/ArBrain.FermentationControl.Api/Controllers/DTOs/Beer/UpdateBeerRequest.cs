namespace ArBrain.FermentationControl.Api.DTOs.Beer;
using System.ComponentModel.DataAnnotations;

public class UpdateBeerRequest
{
    [Required(ErrorMessage = "Informe o nome da cerveja.")]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Informe o estilo da cerveja.")]
    [StringLength(100)]
    public string Style { get; set; } = string.Empty;

    [Range(-20, 50)]
    public decimal MinTemperature { get; set; }

    [Range(-20, 50)]
    public decimal MaxTemperature { get; set; }

    [Range(0, 14)]
    public decimal MinPh { get; set; }

    [Range(0, 14)]
    public decimal MaxPh { get; set; }

    [Range(0, 50)]
    public decimal MinExtract { get; set; }

    [Range(0, 50)]
    public decimal MaxExtract { get; set; }
}