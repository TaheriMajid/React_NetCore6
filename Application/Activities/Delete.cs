using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        // public class command : IRequest
        public class command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        // public class Handler : IRequestHandler<command>
        public class Handler : IRequestHandler<command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            // public async Task<Unit> Handle(command request, CancellationToken cancellationToken)
            public async Task<Result<Unit>> Handle(command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                
                if (activity == null) return null;
                //if (activity == null) return Result<Unit>.Failure("Failed to Delete Activity1"); //for test the message

                _context.Remove(activity);

                //await _context.SaveChangesAsync();
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to Delete Activity2");

                //return Unit.Value;
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}