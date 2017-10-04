using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using cmcglynn_bugTracker.Models;
using cmcglynn_bugTracker.Models.CodeFirst;
using Microsoft.AspNet.Identity;

namespace cmcglynn_bugTracker.Controllers
{
    public class ProjectsController : Universal
    {

        [Authorize]
        // GET: Projects
        public ActionResult Index()
        {
            List<Project> projects = new List<Project>();
            if (User.IsInRole("Admin") || User.IsInRole("Project Manager"))
                projects = db.Projects.ToList();
            else if (User.IsInRole("Developer") || User.IsInRole("Submitter"))
            {
                ApplicationUser user = db.Users.Find(User.Identity.GetUserId());
                projects = user.Projects.ToList();
            }

            return View(projects);
        }

        // GET: Projects/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            return View(project);
        }

        // GET: Projects/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Projects/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Created,Updated,Title,Description,AuthorId")] Project project)
        {
            if (ModelState.IsValid)
            {
                db.Projects.Add(project);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(project);
        }

        // GET: Projects/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            return View(project);
        }
       

        // POST: Projects/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Created,Updated,Title,Description,AuthorId")] Project project)
        {
            if (ModelState.IsValid)
            {
                db.Entry(project).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(project);
        }

        // GET: Projects/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            return View(project);
        }

        // POST: Projects/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Project project = db.Projects.Find(id);
            db.Projects.Remove(project);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
                // GET
        [Authorize(Roles = "Admin, ProjectManager")]
        public ActionResult ProjectUser(int Id)
        {

            var project = db.Projects.Find(Id);
            ProjectViewModel projectuserVM = new ProjectViewModel();
            projectuserVM.AssignProject = project;
            projectuserVM.AssignProjectId = Id;
            projectuserVM.SelectedUsers = project.Users.Select(u => u.Id).ToArray();
            projectuserVM.Users = new MultiSelectList(db.Users.ToList(), "Id", "FirstName", projectuserVM.SelectedUsers);
           
            return View(projectuserVM);
        }
        [HttpPost]    //POST
        [Authorize(Roles = "Admin, ProjectManager")]
        public ActionResult ProjectUser(ProjectViewModel model)
        {
            
            ProjectAssignHelper helper = new ProjectAssignHelper();
            foreach(var userId in db.Users.Select(r => r.Id).ToList())
            {
                helper.RemoveUserFromProject(userId, model.AssignProjectId);
            }
            foreach(var userId in model.SelectedUsers)
            {
                helper.AddUserToProject(userId, model.AssignProjectId);
            }


            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
