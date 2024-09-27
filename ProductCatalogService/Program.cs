using Microsoft.EntityFrameworkCore;
using ProductCatalogService.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<ProductContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowReactApp",
//        builder =>
//        {
//            builder.WithOrigins("http://localhost:3000") 
//                   .AllowAnyHeader()
//                   .AllowAnyMethod()
//                   .AllowCredentials();
//        });
//});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
