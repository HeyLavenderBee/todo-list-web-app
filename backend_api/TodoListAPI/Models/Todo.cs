using FluentValidation;

namespace TodoListAPI.Models
{
    public class Todo
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        private Guid ListId { get; set; }
        private DateTime Creation_date { get; set; } = DateTime.UtcNow;
    }
    public class TodoValidator : AbstractValidator<Todo>
    {
        public TodoValidator()
        {
            RuleFor(t => t.Name).NotEmpty().WithMessage("Todo name must not be empty");
            RuleFor(t => t.Name).MaximumLength(100).WithMessage("Todo name must be up to 100 characters");
            RuleFor(t => t.Name).MinimumLength(1).WithMessage("Todo name must be at least 1 character");
        }
    }
}
