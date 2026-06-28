namespace ArBrain.FermentationControl.Domain.Entities;

public class Tank
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal CapacityLiters { get; set; }
}