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

        public IActionResult Index()
        {
            ViewData["Users"] = Context.Speakers.ToList();
            return View();
        }
    }
}
