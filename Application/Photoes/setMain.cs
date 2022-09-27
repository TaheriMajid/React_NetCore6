using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photoes
{
    public class setMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string PhotoId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                this._dataContext = dataContext;
                this._userAccessor = userAccessor;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                Photo photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

                if (photo == null) return null;

                Photo currentPhoto = user.Photos.FirstOrDefault(x => x.IsMain == true);

                if (currentPhoto != null) currentPhoto.IsMain = false;

                photo.IsMain = true;

                var resultDb = await _dataContext.SaveChangesAsync() > 0;

                if (resultDb) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Probleam changing main photo");
            }
        }
    }
}