using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using SignUpTools.Bussiness;
using SignUpTools.Model;

namespace SignUpTools.Api
{
    public class LoginAuthorization : AuthorizeAttribute
    {
        //重写基类的验证方式，加入我们自定义的Ticket验证 
        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            var requestContent = actionContext.Request.Content.ReadAsStringAsync();//读取post提交的json数据
            requestContent.Wait();//等待异步读取结束
            var inputJson = requestContent.Result;
            //此接口无需token验证
            dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(inputJson);
            
            //url获取token 
            string token = result.access_token;//获取请求参数对应的值
            if (!string.IsNullOrEmpty(token))
            {
                //解密用户ticket,并校验用户名密码是否匹配 
                if (ValidateTicket(token))
                {
                    base.IsAuthorized(actionContext);
                }
                else
                {
                    HandleUnauthorizedRequest(actionContext);
                }
            }
            //如果取不到身份验证信息，并且不允许匿名访问，则返回未验证401
            else
            {
                var attributes = actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().OfType<AllowAnonymousAttribute>();
                bool isAnonymous = attributes.Any(a => a is AllowAnonymousAttribute);
                if (isAnonymous) base.OnAuthorization(actionContext);
                else HandleUnauthorizedRequest(actionContext);
            }
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            // 验证token
            //var token = actionContext.Request.Headers.Authorization;
            var ts = actionContext.Request.Headers.Where(c => c.Key.ToLower() == "tokenxxx").FirstOrDefault().Value;
            var requestContent = actionContext.Request.Content.ReadAsStringAsync();//读取post提交的json数据
            requestContent.Wait();//等待异步读取结束
            var inputJson = requestContent.Result;
            //此接口无需token验证
            dynamic request = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(inputJson);

            return true;

        }


        //校验sign（数据库数据匹配） 
        private bool ValidateTicket(string token)
        {
            var userInfo = UserBussiness.GetUserModel(m => m.OpenID == token);
            return userInfo != null;
        }
    }
}