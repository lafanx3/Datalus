using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Datalus.Web.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datalus.Web.Domain
{
    public class UserSection
    {
        public int UserProfileId { get; set; }
        public int SectionId { get; set; }
        [JsonConverter(typeof(StringEnumConverter))]
        public EnrollmentStatus EnrollmentStatusId { get; set; }
        public int TotalEnrolled { get; set; }
        public bool IsForCredit { get; set; }
        public string Comment { get; set; }
        public UserProfileBase Student { get; set; }
        public Section Section { get; set; }
    }
}
