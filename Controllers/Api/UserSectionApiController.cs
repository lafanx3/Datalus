using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Datalus.Web.Models.Requests;
using Datalus.Web.Models.Responses;
using Datalus.Web.Services;
using Datalus.Web.Domain;


namespace Datalus.Web.Controllers.Api
{
    [RoutePrefix("api/usersection")]
    public class UserSectionApiController : BaseApiController
    {
        private IUserSectionService _userSectionService;

        public UserSectionApiController(IUserSectionService userSectionService)
        {
            _userSectionService = userSectionService;
        }

        [Route, HttpPost]
        public HttpResponseMessage Insert(UserSectionAddRequest model)
        {
            {
                if (!IsModelValid(model))
                {
                    return GetInvalidResponse(model);
                }
                _userSectionService.Insert(model);
                SuccessResponse response = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetByUserProfileId(int id)
        {
            try
            {
                ItemsResponse<UserSection> response = new ItemsResponse<UserSection>();
                response.Items = _userSectionService.GetSectionsByUserProfileId(id);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }

        [Route("section/{id:int}"), HttpGet]
        public HttpResponseMessage GetBySectionId(int id)
        {
            try
            {
                ItemsResponse<UserSection> response = new ItemsResponse<UserSection>();
                response.Items = _userSectionService.GetUsersBySectionId(id);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }

        [Route("sectionCapacity/{id:int}"), HttpGet]
        public HttpResponseMessage GetSpecificUser(int id)
        {
            try
            {
                ItemResponse<UserSection> response = new ItemResponse<UserSection>();
                response.Item = _userSectionService.GetCapacity(id);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }

        [Route("getUser/{userProfileId:int}/{sectionId:int}"), HttpGet]
        public HttpResponseMessage GetSpecificUser(int userProfileId, int sectionId)
        {
            try
            {
                ItemResponse<UserSection> response = new ItemResponse<UserSection>();
                response.Item = _userSectionService.GetSpecificUser(userProfileId, sectionId);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch(Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }

        [Route("update/{userProfileId:int}/{sectionId:int}"), HttpPut]
        public HttpResponseMessage Update(UserSectionUpdateRequest model, int userProfileId, int sectionId)
        {
            try
            {
                if (!IsModelValid(model))
                {
                    return GetInvalidResponse(model);
                }
                _userSectionService.Update(model, userProfileId, sectionId);
                SuccessResponse response = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch(Exception ex)
            {
                return GetErrorResponse(ex);
            }
        }
    }
}
