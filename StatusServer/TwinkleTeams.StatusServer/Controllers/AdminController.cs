using Microsoft.AspNetCore.Mvc;
using TwinkleTeams.StatusServer.Models;

namespace TwinkleTeams.StatusServer.Controllers
{
    public class AdminController : Controller
    {
        private readonly SpeakerDbContext Context;

        public AdminController(SpeakerDbContext context)
        {
            Context = context;
        }

        // GET: AdminController
        public ActionResult Index()
        {
            return View(Context.Speakers.ToList());
        }

        // GET: AdminController/Details/5
        public ActionResult Details(int id)
        {
            var ret = Context.Speakers.Where(x => x.Id == id).FirstOrDefault();
            if (ret == null) return NotFound();
            return View(ret);
        }

        // GET: AdminController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AdminController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async ValueTask<ActionResult> Create(IFormCollection collection)
        {
            try
            {
                var name = collection["Name"];
                var url = collection["ThumbnailUrl"];
                var displayname = collection["DisplayName"];

                if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(url))
                {
                    throw new Exception("invalid parameters");
                }

                Context.Speakers.Add(new Speaker { Name = name, ThumbnailUrl = url, DisplayName = displayname });
                await Context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: AdminController/Edit/5
        public ActionResult Edit(int id)
        {
            var ret = Context.Speakers.Where(x => x.Id == id).FirstOrDefault();
            if (ret == null) return NotFound();
            return View(ret);
        }

        // POST: AdminController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async ValueTask<ActionResult> Edit(int id, IFormCollection collection)
        {
            try
            {
                var target = Context.Speakers.Where(x => x.Id == id).FirstOrDefault();
                if (target == null) return NotFound();

                var name = collection["Name"];
                var url = collection["ThumbnailUrl"];
                var displayname = collection["DisplayName"];

                if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(url))
                {
                    throw new Exception("invalid parameters");
                }

                target.Name = name;
                target.ThumbnailUrl = url;
                target.DisplayName = displayname;
                Context.Speakers.Update(target);
                await Context.SaveChangesAsync();

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: AdminController/Delete/5
        public ActionResult Delete(int id)
        {
            var target = Context.Speakers.Where(x => x.Id == id).FirstOrDefault();
            if (target == null) return NotFound();

            return View(target);
        }

        // POST: AdminController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async ValueTask<ActionResult> Delete(int id, IFormCollection collection)
        {
            try
            {
                var target = Context.Speakers.Where(x => x.Id == id).FirstOrDefault();
                if (target == null) return NotFound();

                Context.Speakers.Remove(target);
                await Context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
