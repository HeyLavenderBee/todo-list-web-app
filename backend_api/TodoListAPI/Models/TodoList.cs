using FluentValidation;

namespace TodoListAPI.Models
{
    public class TodoList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        private TimeSpan Creation_date { get; set; }
    }

    public class TodoListValidator: AbstractValidator<TodoList>
    {
        public TodoListValidator()
        {
            RuleFor(t => t.Name).NotEmpty();
        }
    }
}
