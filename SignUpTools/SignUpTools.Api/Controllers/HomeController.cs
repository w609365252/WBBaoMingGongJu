using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using SignUpTools.Model;
using SignUpTools.Bussiness;
using LeoTools.MiniprogramApiHelper;

namespace SignUpTools.Api.Controllers
{
    public class HomeController : CommonApiController
    {
        [Route("enroll/v1/login")]
        [AcceptVerbs("Get", "Post")]
        public JsonResult<ResultObject> Login([FromBody]dynamic data)
        {
            string code = data.code.Value;
            dynamic result = null;
            result = JsonConvert.DeserializeObject<dynamic>(MiniprogramApiHelper.Login(code));
            string encryptedData = data.user_data.encryptedData.Value;
            string iv = data.user_data.iv.Value;
            string key = result.session_key.Value;
            string nickName = data.user_data.userInfo.nickName.Value;
            string avatarUrl = data.user_data.userInfo.avatarUrl.Value;
            dynamic decrptObj = JsonConvert.DeserializeObject<dynamic>(MiniprogramApiHelper.AES_decrypt(encryptedData, key, iv));
            UserModel userModel = new UserModel();
            userModel.LastLoginTime = DateTime.Now;
            userModel.OpenID = result.openid;
            //userModel.UserMobile= decrptObj
            userModel.UserName = nickName;
            userModel.Avatars = avatarUrl;
            string token = UserBussiness.Login(userModel);
            return Success(new
            {
                signName=nickName,
                access_token = userModel.OpenID,
                nickName,
                phone="",
                auth=2,
                avatarUrl=avatarUrl
            });
        }
    }
}
