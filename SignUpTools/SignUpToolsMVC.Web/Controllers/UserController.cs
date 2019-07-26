using SignUpTools.Bussiness;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignUpToolsMVC.Web.Controllers
{
    public class UserController : BaseController
    {
        // GET: User
        public ActionResult UserInfo(string access_token)
        {
            var user = UserBussiness.GetUserModel(m => m.OpenID == access_token);
            return Success(new
            {
                unionid = access_token,
                authInfo = new
                {
                    user.UserName,
                    user.OpenID,
                    nickName = user.UserName,
                    signName = user.UserName,
                },
                roleIndex = 2,
                authType = 2
            });
        }
    }
}