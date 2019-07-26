using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SignUpTools.Model;
using SignUpTools.Bussiness;
using LeoTools.Common;
using LeoTools.Extension;
using System.Threading.Tasks;
using System.Collections;
using Leo.MiniprogramApiHelper;
using System.Drawing;
using System.IO;

namespace SignUpToolsMVC.Web.Controllers
{
    public class SignUpFormController : BaseController
    {
       /// <summary>
       /// 创建活动
       /// </summary>
       /// <param name="data"></param>
       /// <returns></returns>
        public ActionResult Create(VM_FormModel data)
        {
            var user = UserBussiness.GetUserModel(m => m.OpenID == data.access_token);
            ActivesModel actives = new ActivesModel();
            actives.ActiveAddress = data.address;
            actives.ActiveBeginTime = LeoUtils.ConvertIntDateTime1(double.Parse(data.act_start));
            actives.ActiveEndTime = LeoUtils.ConvertIntDateTime1(double.Parse(data.act_end));
            actives.CreateUserID = user.ID;
            actives.CollectFees = decimal.Parse(data.fee);
            actives.Content = data.content;
            actives.Img = data.banner;
            actives.ImgDetails = string.Join(",", data.pics);
            actives.IsAllowCancel = data.can_quit;
            actives.SigninBeginTIme = LeoUtils.ConvertIntDateTime1(double.Parse(data.start_time));
            actives.SigninEndTime = LeoUtils.ConvertIntDateTime1(double.Parse(data.end_time));
            actives.ListReportPermission = data.visibility;
            actives.ListShowType = data.user_visible;
            actives.ManyCount = data.on_behalf_limit;
            actives.PromoterMobile = data.phone;
            actives.PromoterName = data.sign_name;
            actives.PromoterWechat = data.wx_no;
            actives.SignIntMaxCount = data.limit.ToInt32();
            actives.Title = data.title;
            actives.can_quit = data.can_quit;
            actives.group_qr = data.group_qr;
            actives.is_public = data.is_public;
            actives.latitude = data.latitude;
            actives.longitude = data.longitude;
            actives.on_behalf_limit = data.on_behalf_limit;
            actives.queue = data.queue;
            actives.role = data.role;
            actives.user_visible = data.user_visible;
            actives.verify = data.verify;
            actives.version = data.version;
            actives.visibility = data.visibility;

            List<CustomFieldModel> customFieldValueModel = new List<CustomFieldModel>();
            int i = 1;
            foreach (var item in data.req_info)
            {
                CustomFieldModel customField = new CustomFieldModel();
                customField.CreateUserID = user.ID;
                customField.MaxTextCount = item.max_length.ToInt32();
                customField.MinTextCount = item.min_length.ToInt32();
                customField.Name = item.field_name;
                customField.PlaceHolder = item.field_desc;
                customField.Type = item.field_type;
                customField.Status = item.status.ToInt32();
                customField.require = item.require;
                customField.Sort = i;
                customField.Options = item.options != null ? string.Join(",", item.options) : "";
                i++;
                customFieldValueModel.Add(customField);
            }

            bool flag = ActivesBussiness.InserActiveByTran(actives, customFieldValueModel);
            if (flag) return Success(new { eid = actives.ID });
            else return Fail("添加失败，请重试");
        }

        public JsonResult UpdateActive(VM_FormModel data)
        {
            var user = UserBussiness.GetUserModel(m => m.OpenID == data.access_token);
            ActivesModel actives = new ActivesModel();
            actives.ActiveAddress = data.address;
            actives.ActiveBeginTime = LeoUtils.ConvertIntDateTime1(double.Parse(data.act_start));
            actives.ActiveEndTime = LeoUtils.ConvertIntDateTime1(double.Parse(data.act_end));
            actives.CreateUserID = user.ID;
            actives.Content = data.content;
            actives.Img = data.banner;
            actives.ImgDetails = string.Join(",", data.pics);
            actives.IsAllowCancel = data.can_quit;
            actives.ListReportPermission = data.visibility;
            actives.ListShowType = data.user_visible;
            actives.ManyCount = data.on_behalf_limit;
            actives.PromoterMobile = data.phone;
            actives.PromoterName = data.sign_name;
            actives.PromoterWechat = data.wx_no;
            actives.SignIntMaxCount = data.limit.ToInt32();
            actives.Title = data.title;
            actives.can_quit = data.can_quit;
            actives.group_qr = data.group_qr;
            actives.is_public = data.is_public;
            actives.latitude = data.latitude;
            actives.longitude = data.longitude;
            actives.on_behalf_limit = data.on_behalf_limit;
            actives.queue = data.queue;
            actives.role = data.role;
            actives.user_visible = data.user_visible;
            actives.verify = data.verify;
            actives.version = data.version;
            actives.visibility = data.visibility;
            actives.ID = data.eid.ToInt32();
            List<CustomFieldModel> customFieldValueModel = new List<CustomFieldModel>();
            int i = 1;
            foreach (var item in data.req_info)
            {
                CustomFieldModel customField = new CustomFieldModel();
                customField.CreateUserID = user.ID;
                customField.MaxTextCount = item.max_length.ToInt32();
                customField.MinTextCount = item.min_length.ToInt32();
                customField.Name = item.field_name;
                customField.PlaceHolder = item.field_desc;
                customField.Type = item.field_type;
                customField.Status = item.status.ToInt32();
                customField.require = item.require;
                customField.Sort = i;
                customField.Options = item.options != null ? string.Join(",", item.options) : "";
                i++;
                customFieldValueModel.Add(customField);
            }

            bool flag = ActivesBussiness.UpdateActiveByTran(actives, customFieldValueModel);
            if (flag) return Success(new { eid = actives.ID });
            else return Fail("编辑失败，请重试");
        }

        /// <summary>
        /// 获取我的活动列表
        /// </summary>
        /// <param name="type"></param>
        /// <param name="page"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public ActionResult GetActives(int type = 0, int page = 1, int count = 10)
        {
            PageFliter pageFliter = new PageFliter();
            pageFliter.PageSize = count;
            pageFliter.PageIndex = page;
            var list = ActivesBussiness.GetList(type, LoginUserInfo.ID, pageFliter);
            return Success(list.Select(m => new
            {
                title = m.Title,
                eid = m.ID,
                banner = m.Img,
                user_visible = m.ListReportPermission,
                count = m.SignInCount,
                limit = m.SignIntMaxCount,
                fee = (m.CollectFees / m.SignIntMaxCount) * 100,
                charge = 0,
                has_balance = string.IsNullOrEmpty(m.Img) ? 0 : 1,
                status = m.SigninEndTime <= DateTime.Now ? 2 : m.SigninBeginTIme <= DateTime.Now ? 1: 0
            }), "enrollList");
        }

        public ActionResult RemoveActives(int eid,string final_word="")
        {
            bool flag=ActivesBussiness.DeleteActive(eid);
            if (flag) return Success(new { eid = eid });
            else return Fail("编辑失败，请重试");
        }

        /// <summary>
        /// 活动详情
        /// </summary>
        /// <param name="eid"></param>
        /// <param name="access_token"></param>
        /// <returns></returns>
        public ActionResult Detail(int eid,string access_token)
        {
            int UserID = LoginUserInfo.ID;
            var model = ActivesBussiness.GetActivesModel(eid);

            var list = CustomFieldBussiness.GetCustomFieldModels(m => m.ActiveID == eid);

            var signInModel = SignInRecordBussiness.GetSignInRecordModel(m => m.CreateUserID == UserID && m.ActiveID == eid);

            List<VM_Feild> req_info = new List<VM_Feild>();
            foreach (var item in list)
            {
                VM_Feild feild = new VM_Feild();
                feild.field_key = item.ID.ToString();
                feild.field_desc = item.PlaceHolder;
                feild.field_name = item.Name;
                feild.field_type = item.Type.Value;
                feild.max_length = item.MaxTextCount.ToString();
                feild.min_length = item.MinTextCount.ToString();
                feild.status = item.Status.ToString();
                feild.require = item.require.Value;
                feild.options = !string.IsNullOrEmpty(item.Options) ? item.Options.SplitExtension(",") : new string[] { };
                req_info.Add(feild);
            }
            var createUser = UserBussiness.GetUserModel(model.CreateUserID.Value);

            model.ReadCount = (model.ReadCount ?? 0) + 1;
            Task.Factory.StartNew(() =>
            {
                ActivesModel a = new ActivesModel()
                {
                    ID=model.ID,
                    ReadCount=model.ReadCount
                };
                ActivesBussiness.UpdateActiveModel(a);
            });

            return Success(new
            {
                cid = "",
                start_time = model.SigninBeginTIme!=null? LeoUtils.ConvertDateTimeInt1(model.SigninBeginTIme.Value).ToString():"",
                end_time = LeoUtils.ConvertDateTimeInt1(model.SigninEndTime.Value).ToString(),
                act_start = LeoUtils.ConvertDateTimeInt1(model.ActiveBeginTime.Value).ToString(),
                act_end = LeoUtils.ConvertDateTimeInt1(model.ActiveEndTime.Value).ToString(),
                pics = model.ImgDetails.SplitExtension(","),
                req_info,
                is_admin = model.CreateUserID == UserID,
                sign_name = model.PromoterName,
                fee = (model.CollectFees / model.SignIntMaxCount)*100,
                status = model.SigninEndTime.Value <= DateTime.Now ? 2 : model.SigninBeginTIme.Value <= DateTime.Now ? 1 : 0,
                verify = model.verify,
                banner = model.Img,
                count = model.SignInCount,
                limit = model.SignIntMaxCount,
                address = model.ActiveAddress,
                latitude = !string.IsNullOrEmpty(model.latitude) ? double.Parse(model.latitude) : 0,
                longitude = !string.IsNullOrEmpty(model.longitude) ? double.Parse(model.longitude) : 0,
                on_behalf_limit = model.on_behalf_limit,
                queue = model.queue,
                role = model.role,
                user_visible = model.user_visible,
                version = model.version,
                visibility = model.visibility,
                content = model.Content,
                wx_no = model.PromoterWechat,
                owner_pic = createUser?.Avatars ?? "",
                title = model.Title,
                views = model.ReadCount ?? 0,
                is_owner = model.CreateUserID == UserID ? "owner" : "",
                eid = model.ID,
                on_behalf = signInModel?.type??0,
                info_id = signInModel?.ID ?? 0,
                phone=model.PromoterMobile,
                can_quit=model.can_quit,
            });
        }

        /// <summary>
        /// 活动报名列表
        /// </summary>
        /// <param name="eid"></param>
        /// <param name="lt"></param>
        /// <param name="page"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public ActionResult SignInList(int eid,int lt=-1, int page = 1, int count = 10)
        {
            var model = ActivesBussiness.GetActivesModel(eid);
            PageFliter pageFliter = new PageFliter();
            pageFliter.PageIndex = page;
            pageFliter.PageSize = count;
            var list = SignInRecordBussiness.GetSignInRecordsByActiveID(eid, lt, pageFliter);

            return Success(new
            {
                items = list.Select(m => new
                {
                    name = m.CreateUserName,
                    head_img = m.CreateUserAvatars,
                    user_visible = 1,
                    info_id = m.ID,
                    date_str = m.CreateTime.Value.ToString("yyyy-MM-dd HH:mm"),
                    last_update = LeoUtils.ConvertDateTimeInt1(m.UpdateTime.Value)
                }),
                total=pageFliter.TotalCount,
                endCount=pageFliter.TotalPage,
                info_id=0
            });
        }

        public JsonResult BaoMing(int eid, List<VM_Feild> info, object items = null, int on_behalf = 0, string referer = "")
        {
            var model =new ActivesModel();
            model.ReadCount = (model.ReadCount ?? 0) + 1;
            model.ID = eid;
            model.SignInCount = (model.SignInCount ?? 0) + 1;
            SignInRecordModel signInRecordModel = new SignInRecordModel();
            signInRecordModel.ActiveID = eid;
            signInRecordModel.CreateUserID = LoginUserInfo.ID;
            signInRecordModel.type = on_behalf;
            List<CustomFieldValueModel> list = new List<CustomFieldValueModel>();
            foreach (var item in info)
            {
                CustomFieldValueModel valueModel = new CustomFieldValueModel();
                valueModel.ActiveID = eid;
                valueModel.CreateUserID = LoginUserInfo.ID;
                valueModel.CustomFieldID = item.field_key.ToInt32();
                valueModel.Value = item?.field_value ?? "";
                list.Add(valueModel);
            }

            bool flag = SignInRecordBussiness.InserSignInRecordByTran(model, signInRecordModel, list);
            if (flag) return Success(new { info_id = signInRecordModel.ID });
            else return Fail("请重试");
        }

        public JsonResult my_enroll(int eid)
        {
            var list = SignInRecordBussiness.GetSignInRecordByUser(eid, LoginUserInfo.ID);
            return Success(list.Select(m => new
            {
                info_id= m.ID,
                on_behalf=m.type,
                name=m.CreateUserName,
            }));
        }

        public JsonResult user_detail(int eid,int info_id)
        {
            var list = CustomFieldBussiness.GetustomFieldValueBySignIn(eid, info_id);
            

            List<Dictionary<string, object>> req_info = new List<Dictionary<string, object>>(); ;
            foreach (var item in list)
            {
                Dictionary<string, object> dc = new Dictionary<string, object>();
                dc.Add("field_key", item.ID);
                dc.Add("field_desc", item.PlaceHolder);
                dc.Add("field_name", item.Name);
                dc.Add("field_type", item.Type.Value);
                dc.Add("max_length", item.MaxTextCount);
                dc.Add("min_length", item.MinTextCount);
                dc.Add("status",1);
                dc.Add("require", item.require);
                if (item.Type == 5)
                {
                    dc.Add("field_value", item?.Value?.Split(',') ?? new string[] { });
                }
                else
                {
                    dc.Add("field_value", item?.Value?.ToString() ?? "");
                }
                dc.Add("options", !string.IsNullOrEmpty(item.Options) ? item.Options.SplitExtension(",") : new string[] { });
                req_info.Add(dc);
            }
            return Success(new
            {
                req_info,
                info=req_info
            });
        }

        public JsonResult CertDetail(int info_id)
        {
            var signin = SignInRecordBussiness.GetSignInRecordModel(info_id);
            var active = ActivesBussiness.GetActivesModel(signin.ActiveID.Value);
            var user=UserBussiness.GetUserModel(signin.CreateUserID??0);
            string filePath = Server.MapPath("/Images");
            if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);
            string fileName = filePath + "/" + Guid.NewGuid().ToString();
            try
            {
                Image img = MiniprogramApiHelper.CreateShareCode(signin.ActiveID.Value.ToString() + "_" + info_id, "pages/detail/detail");
                img.Save(fileName);
            }
            catch (Exception ex)
            {
                fileName = "https://res.wx.qq.com/wxdoc/dist/assets/img/WXAQRCode.053ccc63.png";
            }

            return Success(new
            {
                start_time = LeoUtils.ConvertDateTimeInt1(active.SigninBeginTIme),
                end_time = LeoUtils.ConvertDateTimeInt1(active.SigninEndTime),
                act_start = LeoUtils.ConvertDateTimeInt1(active.ActiveBeginTime),
                act_end = LeoUtils.ConvertDateTimeInt1(active.ActiveEndTime),
                enroll_time = LeoUtils.ConvertDateTimeInt1(signin.CreateTime),
                qrcode = fileName,
                items=new ArrayList(),
                title=active.Title,
                name=user.UserName
            });
        }

        /// <summary>
        /// 编辑报名信息
        /// </summary>
        /// <returns></returns>
        public JsonResult UpdateSignInForm(List<VM_Feild> info,int info_id)
        {
            var m=SignInRecordBussiness.GetSignInRecordModel(info_id);
            List<CustomFieldModel> customFieldModels = CustomFieldBussiness.GetCustomFieldModels(K => K.ActiveID == m.ActiveID);
            List<CustomFieldValueModel> list = new List<CustomFieldValueModel>();
            foreach (var item in info)
            {
                CustomFieldValueModel valueModel = new CustomFieldValueModel();
                valueModel.ActiveID = m.ActiveID;
                valueModel.CreateUserID = LoginUserInfo.ID;
                valueModel.CustomFieldID = item.field_key.ToInt32();
                valueModel.SignInID = info_id;
                valueModel.Value = item.field_value ?? "";
                list.Add(valueModel);
            }
            bool flag = SignInRecordBussiness.UpdateSignInRecordByTran(list, info_id);
            if (flag) return Success("success");
            else return Fail("请重试");
        }

        /// <summary>
        /// 取消报名
        /// </summary>
        /// <returns></returns>
        public JsonResult exit(int info_id)
        {
            bool flag = SignInRecordBussiness.ExitSignIn(info_id);
            if (flag) return Success("success");
            else return Fail("请重试");
        }

        public JsonResult user_all(int eid,int page,int count)
        {
            PageFliter pageFliter = new PageFliter()
            {
                PageIndex = page,
                PageSize = count
            };
            var list = SignInRecordBussiness.GetAllSignInRecord(eid, pageFliter);
            List<VM_Feild> field_list = new List<VM_Feild>();
            var customs = CustomFieldBussiness.GetCustomFieldModels(m => m.ActiveID == eid);

            foreach (var item in customs)
            { 
                VM_Feild feild = new VM_Feild();
                feild.field_key = item.ID.ToString();
                feild.field_name = item.Name;
                field_list.Add(feild);
            }
            field_list.Add(new VM_Feild()
            {
                field_key="Status",
                field_name="报名状态"
            })   ;

            field_list.Add(new VM_Feild()
            {
                field_key = "isHeXiao",
                field_name = "是否核销"
            });

            field_list.Add(new VM_Feild()
            {
                field_key = "Desc",
                field_name = "备注说明"
            });

            field_list.Add(new VM_Feild()
             {
                 field_key = "SignInTime",
                 field_name = "报名时间"
             });

            ArrayList user_infos = new ArrayList();
            foreach (var item in list)
            {
                var keys = item.fieldKeys.SplitExtension("!|", StringSplitOptions.None);
                var names = item.fieldNames.SplitExtension("!|",StringSplitOptions.None);
                var vals = item.fieldVals.SplitExtension("!|", StringSplitOptions.None);
                List<VM_Feild> feilds = new List<VM_Feild>();
                for (int i = 0; i < keys.Length; i++)
                {
                    VM_Feild feild = new VM_Feild();
                    feild.field_key = keys[i];
                    feild.field_name = names.Count() < i ? names[i]:"";
                    feild.field_value = vals.Count()<i? vals[i]:"";
                    feilds.Add(feild);
                }

                feilds.Add(new VM_Feild()
                {
                    field_key = "Status",
                    field_name = "报名状态",
                    field_value = item.Status == 1 ? "已审核" : item.Status == 2 ? "驳回" : "未审核"
                });

                feilds.Add(new VM_Feild()
                {
                    field_key = "isHeXiao",
                    field_name = "是否核销",
                    field_value="未核销"
                });

                feilds.Add(new VM_Feild()
                {
                    field_key = "Desc",
                    field_name = "备注说明",
                    field_value=item.AuditDesc
                });

                feilds.Add(new VM_Feild()
                {
                    field_key = "SignInTime",
                    field_name = "报名时间",
                    field_value=item.CreateTime.Value.ToString("yyyy-MM-dd HH:mm")
                });


                user_infos.Add(feilds);
            }

            return Success(new
            {
                field_list,
                user_infos
            });
        }

        public ActionResult Test()
        {
            return Success(LoginUserInfo.ID);
           
        }

        public ActionResult Share(int eid)
        {
            string filePath = Server.MapPath("/Images");
            if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);
            string fileName = filePath + "/" + Guid.NewGuid().ToString();
            try
            {
                Image img = MiniprogramApiHelper.CreateShareCode(eid.ToString(), "pages/detail/detail");
                img.Save(fileName);
            }
            catch (Exception)
            {
                fileName = "https://res.wx.qq.com/wxdoc/dist/assets/img/WXAQRCode.053ccc63.png";
            }
            return Success(new
            {
                url = fileName
            });
        }

        public class VM_FormModel
        {
            public string eid { get; set; }
            /// <summary>
            /// 是否允许代报名
            /// </summary>
            public string on_behalf { get; set; }
            public string access_token { get; set; }
            //报名开始
            public string act_end { get; set; }
            //报名结束
            public string act_start { get; set; }
            //地址
            public string address { get; set; }
            //封面
            public string banner { get; set; }
            //
            public int can_quit { get; set; }
            //详细信息
            public string content { get; set; }
            //活动开始时间
            public string start_time { get; set; }
            //活动结束时间
            public string end_time { get; set; }
            //总费用
            public string fee { get; set; }
            public string group_qr { get; set; }
            public int is_public { get; set; }
            public string latitude { get; set; }
            public string longitude { get; set; }
            /// <summary>
            /// 报名最大人数
            /// </summary>
            public string limit { get; set; }
            /// <summary>
            /// 代报名人数 
            /// </summary>
            public int on_behalf_limit { get; set; }
            //发起人手机号
            public string phone { get; set; }
            public int queue { get; set; }
            public int role { get; set; }
            /// <summary>
            /// 发起人署名
            /// </summary>
            public string sign_name { get; set; }
            public string temp { get; set; }
            //标题
            public string title { get; set; }
            /// <summary>
            /// 0.什么都不显示 1人数、头像和昵称2.人数和头像3人数
            /// </summary>
            public int user_visible { get; set; }
            /// <summary>
            /// 0.参与报名不需要审核 1.参与报名需要审核
            /// </summary>
            public int verify { get; set; }
            public int version { get; set; }
            /// <summary>
            /// 0管理员、1任何人可见、2报名参与人可见
            /// </summary>
            public int visibility { get; set; }
            /// <summary>
            /// 图片组
            /// </summary>
            public string[] pics { get; set; } 
            //微信号
            public string wx_no { get; set; }
            public List<VM_Feild> req_info { get; set; }
        }

        public class VM_Feild
        {
            public string field_key { get; set; }
            public string field_len { get; set; }
            //字段名称
            public string field_name { get; set; }
            /// <summary>
            /// 值
            /// </summary>
            public string field_value { get; set; }
            public int field_type { get; set; }
            //是否必填
            public int require { get; set; }
            //
            public string status { get; set; }
            //字段默认描述
            public string field_desc { get; set; }
            //最小长度
            public string min_length { get; set; }
            //最大长度
            public string max_length { get; set; }

            public string[] options { get; set; }

        }

    }
}