
using DigitalAssets.Api.Data;
using Microsoft.EntityFrameworkCore;

 //var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddControllers();
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReact",
//         policy => policy.AllowAnyOrigin()
//                         .AllowAnyMethod()
//                         .AllowAnyHeader());
// });

// var app = builder.Build();

// app.UseCors("AllowReact");
// app.MapControllers();
// app.MapFallbackToFile("index.html");
// app.Run();

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// 1. Must come before routing
app.UseDefaultFiles(); 
app.UseStaticFiles(); 

app.UseCors("AllowReact");

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

// 2. This ensures that if you refresh the page on a React route (like /dashboard),
// the server sends index.html instead of a 404.
app.MapFallbackToFile("index.html"); 

app.Run();