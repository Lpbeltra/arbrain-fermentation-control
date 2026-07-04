# Estágio de build - usa o SDK completo para compilar e publicar a API
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copia primeiro apenas os .csproj para aproveitar o cache de camadas do Docker no restore
COPY ArBrain.FermentationControl.Api/ArBrain.FermentationControl.Api.csproj ArBrain.FermentationControl.Api/
COPY ArBrain.FermentationControl.Domain/ArBrain.FermentationControl.Domain.csproj ArBrain.FermentationControl.Domain/
COPY ArBrain.FermentationControl.Infrastructure/ArBrain.FermentationControl.Infrastructure.csproj ArBrain.FermentationControl.Infrastructure/
RUN dotnet restore ArBrain.FermentationControl.Api/ArBrain.FermentationControl.Api.csproj

COPY . .
RUN dotnet publish ArBrain.FermentationControl.Api/ArBrain.FermentationControl.Api.csproj -c Release -o /app/publish

# Estágio final - apenas o runtime do ASP.NET, imagem bem menor
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ArBrain.FermentationControl.Api.dll"]
