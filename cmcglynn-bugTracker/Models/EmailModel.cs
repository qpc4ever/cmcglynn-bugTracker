using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace cmcglynn_bugTracker.Models
{
    public class EmailModel
    {
        [Required, Display(Name = "Name")]
        public string FromName { get; set; }
        [Required, Display(Name = "Email"), EmailAddress]

        public string FromEmail { get; set; }

        public string Subject { get; set; }
        [Required]
        [AllowHtml]
        public string Body { get; set; }
    }
}