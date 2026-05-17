using FluentValidation;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TodoListAPI.Models;

namespace TodoListAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("Angular Policy")]
    public class TodoController : Controller
    {
        private readonly IValidator<Todo> _todoValitador;

        public TodoController(IValidator<Todo> todoValidator)
        {
            _todoValitador = todoValidator;
        }

        // GET api/todo/gettodos
        [HttpGet("GetTodos")]
        public async Task<IActionResult> GetTodos()
        {
            var result = "The GET method for todo is working!";
            return Ok(result);
        }

        [HttpPost("AddTodo")]
        public IActionResult AddTodo(Todo todo)
        {
            var validationResult = _todoValitador.Validate(todo);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            return Ok("The todo was created!");
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
