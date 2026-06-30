namespace ArBrain.FermentationControl.Api.DTOs.Dashboard;

public class DashboardResponse
{
    public int TotalRecords { get; set; }
    public int InStandardRecords { get; set; }
    public int WarningRecords { get; set; }
    public int OutOfStandardRecords { get; set; }
}