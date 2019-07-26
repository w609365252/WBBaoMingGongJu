using SignUpTools.Bussiness;
using SignUpTools.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;

namespace SignUpTools.Api
{
    //[LoginAuthorization]
    public class BaseApiController : ApiController
    {
        
        public BaseApiController()
        {
            
        }

        public UserModel LoginInfo
        {
            get
            {
                HttpContextBase context = (HttpContextBase)Request.Properties["MS_HttpContext"];//获取传统context
                HttpRequestBase request = context.Request;//定义传统request对象  
                StringBuilder builder = new StringBuilder();
                foreach (string item in request.Form.Keys)
                {
                    builder.AppendFormat("key:{0},value:{1}", item, request.Form[item]);
                    builder.AppendLine();
                }
                return (UserModel)HttpContext.Current.Session["UserInfo"];
            }
        }

        public void SetCookie(string key, string value)
        {
            HttpCookie cookie = new HttpCookie(key);
            cookie.Value = value;
            HttpContext.Current.Response.Cookies.Add(cookie);
        }

        public string GetCookie(string key)
        {
            return HttpContext.Current.Request.Cookies.Get(key).Value;
        }

        public JsonResult<ResultObject> Success<T>(T data, string msg = "")
        {
            msg = string.IsNullOrEmpty(msg) ? "success" : msg;
            var result = new ResultObject();
            result.code = "1";
            result.msg = msg;
            result.data = data;
            return Json<ResultObject>(result);
        }

        public JsonResult<ResultObject> Fail(string msg = "", string code = "")
        {
            msg = string.IsNullOrEmpty(msg) ? "fail" : msg;
            var result = new ResultObject();
            result.code = string.IsNullOrEmpty(code) ? "-1" : code;
            result.msg = msg;
            return Json<ResultObject>(result);
        }

        public class ResultObject
        {
            /// <summary>
            /// 1成功 
            /// </summary>
            public string code = "";
            public string msg = "";
            public object data = new { };
        }
    }
}