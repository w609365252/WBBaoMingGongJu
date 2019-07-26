using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using SignUpTools.Bussiness;
using SignUpTools.Model;

namespace SignUpTools.Api.Controllers
{
    public class UserApiController : BaseApiController
    {
        [Route("enroll/v1/formid")]
        public JsonResult<ResultObject> SaveFormID([FromBody]dynamic data)
        {
            string access_token = data.access_token.Value;
            string formid = data.formid.Value;
            UserFormIDBussiness.InsertUserFormIDModel(new UserFormIDModel() { OpenID = access_token, FormID = formid });
            //var m = LoginInfo.Avatars;
            return Success("success");
        }

        [AcceptVerbs("Get", "Post")]
        [Route("enroll/v1/userinfo")]
        public JsonResult<ResultObject> UserInfo(string access_token)
        {
            var user = UserBussiness.GetUserModel(m => m.OpenID == access_token);
            return Success(new
            {
                unionid = access_token,
                authInfo=new {
                    user.UserName,
                    user.OpenID,
                    nickName=user.UserName,
                    signName = user.UserName,
                },
                roleIndex = 2,
                authType = 2
            });
        }

    }
}