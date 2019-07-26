﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.42000
//     Website: http://ITdos.com/Dos/ORM/Index.html
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using Dos.ORM;

namespace SignUpTools.Model
{
    /// <summary>
    /// 实体类User。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Table("User")]
    [Serializable]
    public partial class UserModel : Entity
    {
        #region Model
        private int _ID;
        private string _OpenID;
        private string _UserMobile;
        private string _UserName;
        private string _Avatars;
        private DateTime? _CreateTime;
        private DateTime? _LastLoginTime;
        private string _country;
        private string _province;
        private string _city;

        /// <summary>
        /// 
        /// </summary>
        [Field("ID")]
        public int ID
        {
            get { return _ID; }
            set
            {
                this.OnPropertyValueChange("ID");
                this._ID = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("OpenID")]
        public string OpenID
        {
            get { return _OpenID; }
            set
            {
                this.OnPropertyValueChange("OpenID");
                this._OpenID = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("UserMobile")]
        public string UserMobile
        {
            get { return _UserMobile; }
            set
            {
                this.OnPropertyValueChange("UserMobile");
                this._UserMobile = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("UserName")]
        public string UserName
        {
            get { return _UserName; }
            set
            {
                this.OnPropertyValueChange("UserName");
                this._UserName = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("Avatars")]
        public string Avatars
        {
            get { return _Avatars; }
            set
            {
                this.OnPropertyValueChange("Avatars");
                this._Avatars = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("CreateTime")]
        public DateTime? CreateTime
        {
            get { return _CreateTime; }
            set
            {
                this.OnPropertyValueChange("CreateTime");
                this._CreateTime = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("LastLoginTime")]
        public DateTime? LastLoginTime
        {
            get { return _LastLoginTime; }
            set
            {
                this.OnPropertyValueChange("LastLoginTime");
                this._LastLoginTime = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("country")]
        public string country
        {
            get { return _country; }
            set
            {
                this.OnPropertyValueChange("country");
                this._country = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("province")]
        public string province
        {
            get { return _province; }
            set
            {
                this.OnPropertyValueChange("province");
                this._province = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("city")]
        public string city
        {
            get { return _city; }
            set
            {
                this.OnPropertyValueChange("city");
                this._city = value;
            }
        }
        #endregion

        #region Method
        /// <summary>
        /// 获取实体中的主键列
        /// </summary>
        public override Field[] GetPrimaryKeyFields()
        {
            return new Field[] {
                _.ID,
            };
        }
        /// <summary>
        /// 获取实体中的标识列
        /// </summary>
        public override Field GetIdentityField()
        {
            return _.ID;
        }
        /// <summary>
        /// 获取列信息
        /// </summary>
        public override Field[] GetFields()
        {
            return new Field[] {
                _.ID,
                _.OpenID,
                _.UserMobile,
                _.UserName,
                _.Avatars,
                _.CreateTime,
                _.LastLoginTime,
                _.country,
                _.province,
                _.city,
            };
        }
        /// <summary>
        /// 获取值信息
        /// </summary>
        public override object[] GetValues()
        {
            return new object[] {
                this._ID,
                this._OpenID,
                this._UserMobile,
                this._UserName,
                this._Avatars,
                this._CreateTime,
                this._LastLoginTime,
                this._country,
                this._province,
                this._city,
            };
        }
        /// <summary>
        /// 是否是v1.10.5.6及以上版本实体。
        /// </summary>
        /// <returns></returns>
        public override bool V1_10_5_6_Plus()
        {
            return true;
        }
        #endregion

        #region _Field
        /// <summary>
        /// 字段信息
        /// </summary>
        public class _
        {
            /// <summary>
            /// * 
            /// </summary>
            public readonly static Field All = new Field("*", "User");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field ID = new Field("ID", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field OpenID = new Field("OpenID", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field UserMobile = new Field("UserMobile", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field UserName = new Field("UserName", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field Avatars = new Field("Avatars", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field CreateTime = new Field("CreateTime", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field LastLoginTime = new Field("LastLoginTime", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field country = new Field("country", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field province = new Field("province", "User", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field city = new Field("city", "User", "");
        }
        #endregion
    }
}