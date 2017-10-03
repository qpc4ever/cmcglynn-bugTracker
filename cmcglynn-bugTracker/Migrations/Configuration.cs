namespace cmcglynn_bugTracker.Migrations
{
    using cmcglynn_bugTracker.Models;
    using cmcglynn_bugTracker.Models.CodeFirst;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<cmcglynn_bugTracker.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;    // ALWAYS CHANGE TO TRUE !!!
        }
        

        protected override void Seed(cmcglynn_bugTracker.Models.ApplicationDbContext context)
        {
            var roleManager = new RoleManager<IdentityRole>(
                new RoleStore<IdentityRole>(context));
            if (!context.Roles.Any(r => r.Name == "Admin"))
            {

                roleManager.Create(new IdentityRole { Name = "Admin" });
            }
            if (!context.Roles.Any(r => r.Name == "Project Manager"))
            {

                roleManager.Create(new IdentityRole { Name = "Project Manager" });
            }
            if (!context.Roles.Any(r => r.Name == "Developer"))
            {

                roleManager.Create(new IdentityRole { Name = "Developer" });
            }
            if (!context.Roles.Any(r => r.Name == "Submitter"))
            {

                roleManager.Create(new IdentityRole { Name = "Submitter" });
            }
            var userManager = new UserManager<ApplicationUser>(
                new UserStore<ApplicationUser>(context));
            if (!context.Users.Any(u => u.Email == "qpc4ever@gmail.com"))
            {
                userManager.Create(new ApplicationUser
                {
                    UserName = "qpc4ever@gmail.com",
                    Email = "qpc4ever@gmail.com",
                    FirstName = "Chris",
                    LastName = "McGlynn",
                }, "Qpc4ever!");
            }
            var userId = userManager.FindByEmail("qpc4ever@gmail.com").Id;
            userManager.AddToRole(userId, "Admin");

            if (!context.Users.Any(u => u.Email == "rchapman@coderfoundry.com"))
            {
                userManager.Create(new ApplicationUser
                {
                    UserName = "rchapman@coderfoundry.com",
                    Email = "rchapman@coderfoundry.com",
                    FirstName = "Ryan",
                    LastName = "Chapman",
                }, "Password3!");
            }

            var userId_ad = userManager.FindByEmail("rchapman@coderfoundry.com").Id;
            userManager.AddToRole(userId_ad, "Admin");

            if (!context.Users.Any(u => u.Email == "admdemo@coderfoundry.com"))
            {
                userManager.Create(new ApplicationUser
                {
                    UserName = "admdemo@coderfoundry.com",
                    Email = "admdemo@coderfoundry.com",
                    FirstName = "Admin",
                    LastName = "Demo",
                }, "Password4!");
            }
            var userId_admd = userManager.FindByEmail("admdemo@coderfoundry.com").Id;
            userManager.AddToRole(userId_admd, "Admin");

            if (!context.Users.Any(u => u.Email == "mjaang@coderfoundry.com"))
            {
                userManager.Create(new ApplicationUser
                {
                    UserName = "mjaang@coderfoundry.com",
                    Email = "mjaang@coderfoundry.com",
                    FirstName = "Mark",
                    LastName = "Jang",
                }, "Password1!");
            }
            var userId_cf = userManager.FindByEmail("mjaang@coderfoundry.com").Id;
            userManager.AddToRole(userId_cf, "Project Manager");

            if (!context.Users.Any(u => u.Email == "pm@coderfoundry.com"))
            {
                userManager.Create(new ApplicationUser
                {
                    UserName = "pm@coderfoundry.com",
                    Email = "pm@coderfoundry.com",
                    FirstName = "proj",
                    LastName = "manager",
                }, "Password2!");
            }
            var userId_pm = userManager.FindByEmail("pm@coderfoundry.com").Id;
            userManager.AddToRole(userId_pm, "Project Manager");

            if (!context.Users.Any(u => u.Email == "devdemo@coderfoundry.com"))
            {
                userManager.Create(new ApplicationUser
                {
                    UserName = "devdemo@coderfoundry.com",
                    Email = "devdemo@coderfoundry.com",
                    FirstName = "Dev",
                    LastName = "Demo",
                }, "Password5!");
            }
            var userId_dvdmo = userManager.FindByEmail("devdemo@coderfoundry.com").Id;
            userManager.AddToRole(userId_dvdmo, "Developer");


            if (!context.Users.Any(u => u.Email == "submitter@coderfoundry.com"))
            {
                userManager.Create(new ApplicationUser
                {
                    UserName = "submitter@coderfoundry.com",
                    Email = "submitter@coderfoundry.com",
                    FirstName = "Sub",
                    LastName = "Mitter",
                }, "Password1!");
            }
            var userId_sb = userManager.FindByEmail("submitter@coderfoundry.com").Id;
            userManager.AddToRole(userId_sb, "Submitter");

            if (!context.TicketPriorities.Any(p => p.Name == "Low"))
            {
                var priority = new TicketPriority();
                priority.Name = "Low";
                context.TicketPriorities.Add(priority);
            }

            if (!context.TicketPriorities.Any(p => p.Name == "Medium"))
            {
                var priority = new TicketPriority();
                priority.Name = "Medium";
                context.TicketPriorities.Add(priority);
            }

            if (!context.TicketPriorities.Any(p => p.Name == "High"))
            {
                var priority = new TicketPriority();
                priority.Name = "High";
                context.TicketPriorities.Add(priority);
            }

            if (!context.TicketPriorities.Any(p => p.Name == "Urgent"))
            {
                var priority = new TicketPriority();
                priority.Name = "Urgent";
                context.TicketPriorities.Add(priority);
            }

            if (!context.TicketStatuses.Any(p => p.Name == "Unassigned"))
            {
                var status = new TicketStatus();
                status.Name = "Unassigned";
                context.TicketStatuses.Add(status);
            }

            if (!context.TicketStatuses.Any(p => p.Name == "Assigned"))
            {
                var status = new TicketStatus();
                status.Name = "Assigned";
                context.TicketStatuses.Add(status);
            }

            if (!context.TicketStatuses.Any(p => p.Name == "In Progress"))
            {
                var status = new TicketStatus();
                status.Name = "In Progress";
                context.TicketStatuses.Add(status);
            }

            if (!context.TicketStatuses.Any(p => p.Name == "Complete"))
            {
                var status = new TicketStatus();
                status.Name = "Complete";
                context.TicketStatuses.Add(status);
            }

            if (!context.TicketTypes.Any(p => p.Name == "Hardware"))
            {
                var type = new TicketType();
                type.Name = "Hardware";
                context.TicketTypes.Add(type);
            }

            if (!context.TicketTypes.Any(p => p.Name == "Software"))
            {
                var type = new TicketType();
                type.Name = "Software";
                context.TicketTypes.Add(type);
            }
        }
    }
}