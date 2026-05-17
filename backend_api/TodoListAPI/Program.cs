using FluentValidation;
using TodoListAPI.Models;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

// validations
builder.Services.AddTransient<IValidator<Todo>, TodoValidator>();
builder.Services.AddTransient<IValidator<TodoList>, TodoListValidator>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Angular Policy",
        policy =>
        {
            policy.WithOrigins("http://localhost:7200")
            .AllowAnyMethod()
            .AllowAnyHeader();
        }
    );
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("Angular Policy");

app.UseAuthorization();

app.MapControllers();

app.Run();
