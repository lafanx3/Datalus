using Datalus.Web.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datalus.Web.Controllers
{
    [RoutePrefix("UserSection")]
    public class UserSectionController : BaseController
    {
        // GET: SectionRegistration
        [Route, HttpGet]
        public ActionResult Index()
        {
            BaseViewModel model = new BaseViewModel();
            model = DecorateViewModel(model);
            return View(model);
        }
    }
}
