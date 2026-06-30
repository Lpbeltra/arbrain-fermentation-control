using ArBrain.FermentationControl.Domain.Entities;
using ArBrain.FermentationControl.Domain.Enums;

namespace ArBrain.FermentationControl.Domain.Services;

public class FermentationEvaluator
{
    public FermentationStatus Evaluate(Beer beer, FermentationRecord record)
    {
        var outOfRangeCount = 0;

        if (record.Temperature < beer.MinTemperature || record.Temperature > beer.MaxTemperature)
            outOfRangeCount++;

        if (record.Ph < beer.MinPh || record.Ph > beer.MaxPh)
            outOfRangeCount++;

        if (record.Extract < beer.MinExtract || record.Extract > beer.MaxExtract)
            outOfRangeCount++;

        return outOfRangeCount switch
            {
                0 => FermentationStatus.InStandard,
                1 => FermentationStatus.Warning,
                _ => FermentationStatus.OutOfStandard
            };
    }
}