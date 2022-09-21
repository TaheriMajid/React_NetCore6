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

namespace Application.Activities
{
    public class UpdateAttnedance
    {
        public class command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._context = context;
            }
            public async Task<Result<Unit>> Handle(command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(b => b.AppUser)
                    .SingleOrDefaultAsync(it => it.Id == request.Id);

                if (activity == null) return null;

                var user = await _context.Users
                .FirstOrDefaultAsync(it => it.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var hostUserName = activity.Attendees.FirstOrDefault(it => it.IsHost).AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(it => it.AppUser.UserName == user.UserName);


                if (attendance != null && hostUserName == user.UserName)
                {
                    activity.isCancelled = !activity.isCancelled;
                }

                if (attendance != null && hostUserName != user.UserName)
                {
                    activity.Attendees.Remove(attendance);
                }

                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        Activity = activity,
                        AppUser = user,
                        IsHost = false
                    };
                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem Updating Activity");
            }
        }
    }
}