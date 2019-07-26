using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignUpToolsMVC.Web.Controllers
{
    public class FileController : BaseController
    {
        public JsonResult Upload()
        {
            var str = "";
            List<string> urls = new List<string>();
            if (HttpContext.Request.Files.Count > 0)
            {
                string filePath = Server.MapPath("/Images");
                if (!Directory.Exists(filePath)) Directory.CreateDirectory(filePath);
                
                foreach (string Keys in HttpContext.Request.Files.AllKeys)
                {
                    var item = HttpContext.Request.Files[Keys];
                    string ext = Path.GetExtension(item.FileName);
                    string FileName = Guid.NewGuid().ToString()+ ext;
                    string fullPath = filePath + "/" + FileName;
                    Stream sr = item.InputStream;
                    Image img = Image.FromStream(sr);
                    img.Save(fullPath);
                    urls.Add(Common.HostUrl +  "/Images/" + FileName);
                }
            }
            return Success(new { urls });
        }
    }
}