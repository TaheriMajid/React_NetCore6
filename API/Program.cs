using API.Extensions;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Sqlite;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddDbContext<DataContext>(opt => { opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")); });

// builder.Services.AddCors(opt =>
// {
//     opt.AddPolicy("CorsPolicy", policy =>
//     {
//         policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
//     });
// });

// builder.Services.AddMediatR(typeof(List.Handler).Assembly);
// builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

using var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
var services = serviceScope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    context.Database.Migrate();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
