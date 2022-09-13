using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        // public class Query : IRequest<Activity>
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }

        //public class Handler : IRequestHandler<Query, Activity>
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            //public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var activity = await _context.Activities.FindAsync(request.Id);
                // if (activity == null) throw new Exception("Activity Not Found");
                // return activity;

                var activity = await _context.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity);
            }
        }


    }
}