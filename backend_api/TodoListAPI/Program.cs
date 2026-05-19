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
    options.AddPolicy(name: "AngularPolicy",
        policy =>
            policy.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("AngularPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
