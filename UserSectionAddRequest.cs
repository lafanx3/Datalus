using Datalus.Web.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Datalus.Web.Models.Requests
{
    public class UserSectionAddRequest
    {
        [Required]
        public int UserProfileId { get; set; }
        [Required]
        public int SectionId { get; set; }
        [Required]
        public EnrollmentStatus EnrollmentStatusId { get; set; }
        [Required]
        public bool IsForCredit { get; set; }
        [Required]
        public string Comment { get; set; }
    }
}
