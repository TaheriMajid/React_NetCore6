using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        // public async Task<ActionResult<List<Activity>>> GetActivities()
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        // [Authorize]
        [HttpGet("{id}")]
        //public async Task<ActionResult<Activity>> GetActivity(Guid id)
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));

        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            // return Ok(await Mediator.Send(new Create.command { Activity = activity }));
            return HandleResult(await Mediator.Send(new Create.command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            //return Ok(await Mediator.Send(new Edit.command { Activity = activity }));
            return HandleResult(await Mediator.Send(new Edit.command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            // return Ok(await Mediator.Send(new Delete.command { Id = id }));
            return HandleResult(await Mediator.Send(new Delete.command { Id = id }));
        }
    }
}