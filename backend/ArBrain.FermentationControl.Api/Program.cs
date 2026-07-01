using ArBrain.FermentationControl.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using ArBrain.FermentationControl.Domain.Services;

var builder = WebApplication.CreateBuilder(args);

// Configura política de CORS - Isso é apenas para que possamos rodar a API e o front no mesmo localhost, mas em
// portas diferentes (o navegador bloqueia a comunicação entre portas por padrão)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<FermentationEvaluator>();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usa a política de CORS
app.UseCors("AllowFrontend");

app.MapControllers();
app.Run();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();