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
    public class UserSectionService : BaseService
    {
        public static void Insert(UserSectionAddRequest model)
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

        public static List<UserSection> GetSectionsByUserProfileId(int id)
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
                   UserSection section = new UserSection();
                   section.Section = new Section();
                   if (resultSetNumber == 0)
                   {
                       section.UserProfileId = reader.GetSafeInt32(columnOrdPosition++);
                       section.SectionId = reader.GetSafeInt32(columnOrdPosition++);
                       section.Section.SectionNumberId = reader.GetSafeString(columnOrdPosition++);
                       section.Section.Title = reader.GetSafeString(columnOrdPosition++);
                       section.EnrollmentStatusId = (EnrollmentStatus)reader.GetSafeInt32(columnOrdPosition++);
                       section.IsForCredit = reader.GetSafeBool(columnOrdPosition++);
                       section.Comment = reader.GetSafeString(columnOrdPosition++);
                   }
                   //else if (resultSetNumber == 1)
                   //{
                   //    section.Section.Id = reader.GetSafeInt32(columnOrdPosition++);
                   //    section.Section.SectionNumberId = reader.GetSafeInt32(columnOrdPosition++);
                   //    section.Section.Credits = reader.GetSafeInt32(columnOrdPosition++);
                   //    section.Section.Title = reader.GetSafeString(columnOrdPosition++);
                   //    section.Section.DayOffered = reader.GetSafeString(columnOrdPosition++);
                   //    section.Section.StartTime = reader.GetSafeDateTime(columnOrdPosition++);
                   //    section.Section.Capacity = reader.GetSafeInt32(columnOrdPosition++);
                   //    section.Section.StartDate = reader.GetSafeDateTime(columnOrdPosition++);
                   //    section.Section.EndDate = reader.GetSafeDateTime(columnOrdPosition++);
                   //    section.Section.Instructor = new InstructorBase();
                   //    section.Section.Instructor.id = reader.GetSafeInt32(columnOrdPosition++);
                   //    section.Section.Campus = new Campus();
                   //    section.Section.Campus.Id = reader.GetSafeInt32(columnOrdPosition++);
                   //}

                   if (userSections == null)
                   {
                       userSections = new List<UserSection>();
                   }
                   userSections.Add(section);
               });

            return userSections;
        }

        public static List<UserSection> GetUsersBySectionId(int id)
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

        public static UserSection GetSpecificUser(int userProfileId, int sectionId)
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

        public static UserSection GetCapacity(int sectionId)
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


        public static void Update(UserSectionUpdateRequest model, int userProfileId, int sectionId)
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
