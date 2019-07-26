using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;

namespace SignUpTools.Api
{
    public class CommonApiController : ApiController
    {
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

    }
}