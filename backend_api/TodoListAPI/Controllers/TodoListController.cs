using FluentValidation;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoListAPI.Models;

namespace TodoListAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("Angular Policy")]
    public class TodoListController : Controller
    {
        private readonly IValidator<TodoList> _todoListValidator;

        // GET api/todolist/gettodolists
        [HttpGet("GetTodoLists")]
        public async Task<IActionResult> GetTodoLists()
        {
            var result = "The GET method is working!";
            return Ok(result);
        }

        [HttpPost("CreateTodoList")]
        public async Task<IActionResult> CreateProduct([FromBody] TodoList todoList)
        {
            return Ok(todoList);
        }

        // POST: TodoListController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // POST: TodoListController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: TodoListController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: TodoListController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
