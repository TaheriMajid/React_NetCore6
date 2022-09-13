using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        //public class Query : IRequest<List<Activity>> { }
        public class Query : IRequest<Result<List<Activity>>> { }

        // public class Handler : IRequestHandler<Query, List<Activity>>
        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // return await _context.Activities.ToListAsync();
                var activities = await _context.Activities.ToListAsync();
                return Result<List<Activity>>.Success(activities);
            }
        }
    }
}