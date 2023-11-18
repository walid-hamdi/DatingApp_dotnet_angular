using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>((opt) =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("defaultConnectionString"));

});

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: "MyPolicy",
//                       builder =>
//                       {
//                           builder.WithOrigins("http://localhost:4200");
//                       });
// });

var app = builder.Build();

app.UseCors(builder =>
                      {
                          builder.AllowAnyHeader().AllowAnyHeader().WithOrigins("http://localhost:4200");
                      });

app.MapControllers();

app.Run();
