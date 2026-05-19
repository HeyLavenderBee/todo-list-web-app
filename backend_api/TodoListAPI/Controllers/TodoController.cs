using FluentValidation;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TodoListAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace TodoListAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AngularPolicy")]
    public class TodoController : Controller
    {
        private readonly IValidator<Todo> _todoValitador;
        private readonly IConfiguration _configuration;

        public TodoController(IValidator<Todo> todoValidator, IConfiguration configuration)
        {
            _todoValitador = todoValidator;
            _configuration = configuration;
        }

        public void GetTodoJson()
        {
        }

        // GET api/todo/gettodos
        [HttpGet("GetTodos")]
        public async Task<IActionResult> GetTodos()
        {
            //later make trycatch for not being able to reach table or database
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("TodoListDbConn").ToString());
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM todos", conn);
            DataTable dt = new DataTable();
            da.Fill(dt);

            List<Todo> todoList = new List<Todo>();

            if (dt.Rows.Count > 0)
            {
                for(int i = 0; i < dt.Rows.Count; i++)
                {
                    Todo todo = new Todo();
                    todo.Name = Convert.ToString(dt.Rows[i]["todo_name"]);
                    todoList.Add(todo);
                }
            }

            if (todoList.Count > 0)
                return Ok(todoList);
            else 
                return StatusCode(100, "No todo data found");
        }

        [HttpPost("AddTodo")]
        public async Task<IActionResult> AddTodo(Todo todo)
        {
            var validationResult = _todoValitador.Validate(todo);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("TodoListDbConn").ToString());
            string query = "INSERT INTO todos (id, todo_name) VALUES (@TodoId, @TodoName)";

            SqlCommand cmd = new SqlCommand(query, conn); //stabilishes connection

            cmd.Parameters.AddWithValue("@TodoId", todo.Id);
            cmd.Parameters.AddWithValue("@TodoName", todo.Name);
            await conn.OpenAsync();
            int rows = await cmd.ExecuteNonQueryAsync();

            if (rows > 0)
                return Ok("The todo was created!");
            else
                return StatusCode(500, "No rows were inserted");
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
