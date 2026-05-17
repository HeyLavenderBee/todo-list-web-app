using FluentValidation;

namespace TodoListAPI.Models
{
    public class Todo
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        private DateTime Creation_date { get; set; } = DateTime.UtcNow;
    }
    public class TodoValidator : AbstractValidator<Todo>
    {
        public TodoValidator()
        {
            RuleFor(t => t.Name).NotEmpty().WithMessage("Todo name must not be empty");
        }
    }
}
