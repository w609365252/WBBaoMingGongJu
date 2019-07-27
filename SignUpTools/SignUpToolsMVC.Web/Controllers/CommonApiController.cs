using SignUpTools.Bussiness;
using SignUpTools.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SignUpToolsMVC
{
    public class BaseController : Controller
    {
        public UserModel LoginUserInfo
        {
            get
            {
                HttpRequestBase request = HttpContext.Request;//定义传统request对象  
                string token = request.QueryString["access_token"];
                if (string.IsNullOrEmpty(token))
                {
                    token = request.Form["access_token"];
                }
                var user = UserBussiness.GetUserModel(m => m.OpenID == token);
                return user;
            }
        }

        public JsonResult Success(object data, string msg = "")
        {
            msg = string.IsNullOrEmpty(msg) ? "success" : msg;
            var result = new ResultObject();
            result.code = "1";
            result.msg = msg;
            result.sta = 0;
            result.data = data;
            return Json(result,JsonRequestBehavior.AllowGet);
        }

        public JsonResult Success(object data, string key, string msg = "")
        {
            msg = string.IsNullOrEmpty(msg) ? "success" : msg;
            var result = new ResultObject();
            result.code = "1";
            result.msg = msg;
            result.sta = 0;
            result.data = data;
            Dictionary<string, object> keyValues = new Dictionary<string, object>();
            keyValues.Add("code", 1);
            keyValues.Add("msg", msg);
            keyValues.Add("sta", 0);
            keyValues.Add(key, data);
            return Json(keyValues, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Fail(string msg = "", string code = "")
        {
            msg = string.IsNullOrEmpty(msg) ? "fail" : msg;
            var result = new ResultObject();
            result.code = string.IsNullOrEmpty(code) ? "-1" : code;
            result.msg = msg;
            result.sta = -1;
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public class ResultObject
        {
            /// <summary>
            /// 1成功 
            /// </summary>
            public string code = "";
            public string msg = "";
            public int sta =-1;
            public object data = new { };
        }


    }
}