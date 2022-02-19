using Microsoft.AspNetCore.Mvc;

namespace TwinkleTeams.StatusServer.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
