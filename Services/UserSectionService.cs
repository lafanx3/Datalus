using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using Datalus.Data;
using Datalus.Web.Models.Requests;
using Datalus.Web.Domain;
using System.Data;
using Datalus.Web.Enums;

namespace Datalus.Web.Services
{
    public class UserSectionService : BaseService, IUserSectionService
    {
        public void Insert(UserSectionAddRequest model)
        {
            string userId = UserService.GetCurrentUserId();

            DataProvider.ExecuteNonQuery(GetConnection, "dbo.UserSections_Insert"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@UserProfileId", model.UserProfileId);
                    paramCollection.AddWithValue("@SectionId", model.SectionId);
                    paramCollection.AddWithValue("@EnrollmentStatusId", model.EnrollmentStatusId);
                    paramCollection.AddWithValue("@IsForCredit", model.IsForCredit);
                    paramCollection.AddWithValue("@Comment", model.Comment);
                    paramCollection.AddWithValue("@UserId", userId);
                }, returnParameters: null
                );
        }

        public List<UserSection> GetSectionsByUserProfileId(int id)
        {
            List<UserSection> userSections = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.UserSections_GetByUserProfileId"
               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
               {
                   paramCollection.AddWithValue("@UserProfileId", id);
               }
               , map: delegate (IDataReader reader, short resultSetNumber)
               {
                   int columnOrdPosition = 0;
                   UserSection userSection = new UserSection();
                   userSection.Section = new Section();
                   if (resultSetNumber == 0)
                   {
                       userSection.UserProfileId = reader.GetSafeInt32(columnOrdPosition++);
                       userSection.SectionId = reader.GetSafeInt32(columnOrdPosition++);
                       userSection.Section.SectionNumberId = reader.GetSafeString(columnOrdPosition++);
                       userSection.Section.Title = reader.GetSafeString(columnOrdPosition++);
                       userSection.EnrollmentStatusId = (EnrollmentStatus)reader.GetSafeInt32(columnOrdPosition++);
                       userSection.IsForCredit = reader.GetSafeBool(columnOrdPosition++);
                       userSection.Comment = reader.GetSafeString(columnOrdPosition++);
                   }
                   if (userSections == null)
                   {
                       userSections = new List<UserSection>();
                   }
                   userSections.Add(userSection);
               });

            return userSections;
        }

        public List<UserSection> GetUsersBySectionId(int id)
        {
            List<UserSection> users = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.UserSections_GetBySectionId"
               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
               {
                   paramCollection.AddWithValue("@SectionId", id);
               }
               , map: delegate (IDataReader reader, short resultSetNumber)
               {

                   int columnOrdinalPosition = 0;
                   UserSection user = new UserSection();
                   user.Student = new UserProfileBase();
                   user.UserProfileId = reader.GetSafeInt32(columnOrdinalPosition++);
                   user.SectionId = reader.GetSafeInt32(columnOrdinalPosition++);
                   user.Student.FirstName = reader.GetSafeString(columnOrdinalPosition++);
                   user.Student.LastName = reader.GetSafeString(columnOrdinalPosition++);
                   user.EnrollmentStatusId = (EnrollmentStatus)reader.GetSafeInt32(columnOrdinalPosition++);
                   user.Comment = reader.GetSafeString(columnOrdinalPosition++);

                   if (users == null)
                   {
                       users = new List<UserSection>();
                   }


                   users.Add(user);
               });
            return users;
        }

        public UserSection GetSpecificUser(int userProfileId, int sectionId)
        {
            UserSection userSection = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.UserSections_SelectSpecificUser"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@UserProfileId", userProfileId);
                    paramCollection.AddWithValue("@SectionId", sectionId);
                }
                , map: delegate (IDataReader reader, short resultSetNumber)
                {
                    int startingIndex = 0;
                    userSection = new UserSection();
                    userSection.UserProfileId = reader.GetSafeInt32(startingIndex++);
                    userSection.SectionId = reader.GetSafeInt32(startingIndex++);
                    userSection.EnrollmentStatusId = reader.GetSafeEnum<EnrollmentStatus>(startingIndex++);
                    userSection.IsForCredit = reader.GetSafeBool(startingIndex++);
                    userSection.Comment = reader.GetSafeString(startingIndex++);
                });
            return userSection;
        }

        public UserSection GetCapacity(int sectionId)
        {
            UserSection user = null;
            DataProvider.ExecuteCmd(GetConnection, "dbo.UserSections_EnrollmentCapacity"
              , inputParamMapper: delegate (SqlParameterCollection paramCollection)
              {
                  paramCollection.AddWithValue("@SectionId", sectionId);
              }
              , map: delegate (IDataReader reader, short resultSetNumber)
              {
                  int columnOrdPosition = 0;

                  user = new UserSection();
                  user.Section = new Section();
                  user.Section.Id = reader.GetSafeInt32(columnOrdPosition++);
                  user.Section.Title = reader.GetSafeString(columnOrdPosition++);
                  user.Section.Capacity = reader.GetSafeInt32(columnOrdPosition++);
                  user.TotalEnrolled = reader.GetSafeInt32(columnOrdPosition++);

              });
            return user;
        }


        public void Update(UserSectionUpdateRequest model, int userProfileId, int sectionId)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.UserSections_UpdateUser"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                 {
                     paramCollection.AddWithValue("@UserProfileId", userProfileId);
                     paramCollection.AddWithValue("@SectionId", sectionId);
                     paramCollection.AddWithValue("@EnrollmentStatusId", model.EnrollmentStatusId);
                     paramCollection.AddWithValue("@IsForCredit", model.IsForCredit);
                     paramCollection.AddWithValue("@Comment", model.Comment);
                 }, returnParameters: null
                 );
        }
    }
}
