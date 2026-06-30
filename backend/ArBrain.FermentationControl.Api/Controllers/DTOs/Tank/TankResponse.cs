namespace ArBrain.FermentationControl.Api.DTOs.Tank;

public class TankResponse
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal CapacityLiters { get; set; }
}