using ArBrain.FermentationControl.Domain.Entities;
using ArBrain.FermentationControl.Domain.Enums;

namespace ArBrain.FermentationControl.Domain.Services;

public class FermentationEvaluator
{
    public FermentationStatus Evaluate(Beer beer, FermentationRecord record)
    {
        var outOfRangeCount = 0;

        // Para cada parâmetro verifico se o valor informado está fora dos limites definidos para a cerveja. A quantidade de desvios será utilizada para
        // determinar o status final da fermentação.
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