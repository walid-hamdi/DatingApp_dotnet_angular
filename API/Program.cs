using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>((opt) => { opt.UseSqlite(builder.Configuration.GetConnectionString("defaultConnectionString")); });
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddControllers();

var app = builder.Build();
app.UseCors(builder => { builder.AllowAnyHeader().AllowAnyHeader().WithOrigins("http://localhost:4200"); });
app.MapControllers();

app.Run();
