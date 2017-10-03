using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using cmcglynn_bugTracker.Models;
using System.Threading.Tasks;
using System.Configuration;
using System.Net.Mail;
using static cmcglynn_bugTracker.EmailService;

namespace cmcglynn_bugTracker.Controllers
{
    public class HomeController : Universal
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        
    }
}