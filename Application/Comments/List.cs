using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                this._mapper = mapper;
                this._dataContext = dataContext;

            }
            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _dataContext.Comments
                        .Where(it => it.Activity.Id == request.ActivityId)
                        // .OrderBy(it => it.CreateAt)
                        .OrderByDescending(it => it.CreateAt)
                        .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                        .ToListAsync();
                        
                return Result<List<CommentDto>>.Success(comments);

            }
        }
    }
}