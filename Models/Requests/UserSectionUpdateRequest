using Datalus.Web.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Datalus.Web.Models.Requests
{
    public class UserSectionUpdateRequest
    {
        [Required]
        public int UserProfileId{get; set;}
        [Required]
        public int SectionId { get; set; }
        public EnrollmentStatus EnrollmentStatusId { get; set; }
        public bool IsForCredit { get; set; }
        public string Comment { get; set; }
    }
}
