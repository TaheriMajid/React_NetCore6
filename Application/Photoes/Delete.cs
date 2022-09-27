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
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string PhotoId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                this._dataContext = dataContext;
                this._userAccessor = userAccessor;
                this._photoAccessor = photoAccessor;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                Photo photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

                if (photo == null) return null;

                if (photo.IsMain) return Result<Unit>.Failure("You can not remove your main photo");

                var resultPhotoRemove = await _photoAccessor.DeletePhoto(request.PhotoId);

                if (resultPhotoRemove == null) return Result<Unit>.Failure("Error Deleting From Cloudinary");

                user.Photos.Remove(photo);

                var resultDb = await _dataContext.SaveChangesAsync() > 0;

                if (resultDb) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Error Deleting From API");
            }
        }
    }
}