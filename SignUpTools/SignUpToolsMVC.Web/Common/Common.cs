using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SignUpToolsMVC
{
    public class Common
    {
        public static string HostUrl = ConfigurationManager.AppSettings["Host"].ToString();
    }
}