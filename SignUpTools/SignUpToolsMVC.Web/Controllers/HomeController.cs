using LeoTools.MiniprogramApiHelper;
using Newtonsoft.Json;
using SignUpTools;
using SignUpTools.Bussiness;
using SignUpTools.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignUpToolsMVC.Web.Controllers
{
    public class HomeController : BaseController
    {
        public JsonResult Login(string code, View_UserData user_data)
        {
            dynamic result = null;
            dynamic data = JsonConvert.DeserializeObject<dynamic>(user_data.rawData);
            result = JsonConvert.DeserializeObject<dynamic>(MiniprogramApiHelper.Login(code));
            string encryptedData = user_data.encryptedData;
            string iv = user_data.iv;
            string key = result.session_key;
            string nickName = data.nickName;
            string avatarUrl = data.avatarUrl;
            UserModel userModel = new UserModel();
            userModel.LastLoginTime = DateTime.Now;
            userModel.OpenID = result.openid;
            userModel.UserName = nickName;
            userModel.Avatars = avatarUrl;
            try
            {
                dynamic decrptObj = JsonConvert.DeserializeObject<dynamic>(MiniprogramApiHelper.AES_decrypt(encryptedData, key, iv));
                userModel.city = decrptObj.city;
                userModel.province = decrptObj.province;
                userModel.country = decrptObj.country;

            }
            catch (Exception)
            {

            }
            var user = UserBussiness.GetUserModel(m => m.OpenID == userModel.OpenID);
            if (user == null)
            {
                string token = UserBussiness.Login(userModel);
            }
            else
            {
                UserBussiness.UpdateUserModel(userModel);
            }
            return Success(new
            {
                uname = nickName,
                upic = avatarUrl,
                signName = nickName,
                access_token = userModel.OpenID,
                nickName,
                phone = userModel.UserMobile,
                userModel.city,
                userModel.province,
                userModel.country,
                auth = 2,
                avatarUrl = avatarUrl,

            });
        }

        public JsonResult SaveFormID(string formid,string access_token)
        {
            UserFormIDBussiness.InsertUserFormIDModel(new UserFormIDModel() { OpenID = access_token, FormID = formid });
            return Success("success");
        }

        public class View_UserData
        {
            public string encryptedData { get; set; }
            public string errMsg { get; set; }
            public string iv { get; set; }
            public string rawData { get; set; }
            public string signature { get; set; }
        }

    }
}