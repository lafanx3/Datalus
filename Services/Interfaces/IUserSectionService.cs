using System.Collections.Generic;
using Datalus.Web.Domain;
using Datalus.Web.Models.Requests;

namespace Datalus.Web.Services
{
    public interface IUserSectionService
    {
        UserSection GetCapacity(int sectionId);
        List<UserSection> GetSectionsByUserProfileId(int id);
        UserSection GetSpecificUser(int userProfileId, int sectionId);
        List<UserSection> GetUsersBySectionId(int id);
        void Insert(UserSectionAddRequest model);
        void Update(UserSectionUpdateRequest model, int userProfileId, int sectionId);
    }
}
