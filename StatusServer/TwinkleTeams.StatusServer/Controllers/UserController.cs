using Microsoft.AspNetCore.Mvc;
using TwinkleTeams.StatusServer.Models;

namespace TwinkleTeams.StatusServer.Controllers
{
    public class UserController : Controller
    {
        private readonly SpeakerDbContext Context;

        public UserController(SpeakerDbContext context)
        {
            Context = context;
        }

        public IActionResult Index(int? id)
        {
            if (id.HasValue)
            {
                ViewData["Users"] = Context.Speakers.Where(x => x.Id == id.Value).ToList();
            }
            else
            {
                ViewData["Users"] = Context.Speakers.ToList();
            }
            return View();
        }
    }
}
