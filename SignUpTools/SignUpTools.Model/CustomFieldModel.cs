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
    /// 实体类CustomField。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Table("CustomField")]
    [Serializable]
    public partial class CustomFieldModel : Entity
    {
        #region Model
        private int _ID;
        private string _Name;
        private string _PlaceHolder;
        private int? _Type;
        private int? _MinTextCount;
        private int? _MaxTextCount;
        private int? _Sort;
        private int? _ActiveID;
        private int? _CreateUserID;
        private DateTime? _CreateTime;
        private int? _Status;
        private string _Options;
        private int? _require;

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
        /// 标题
        /// </summary>
        [Field("Name")]
        public string Name
        {
            get { return _Name; }
            set
            {
                this.OnPropertyValueChange("Name");
                this._Name = value;
            }
        }
        /// <summary>
        /// 提示文本
        /// </summary>
        [Field("PlaceHolder")]
        public string PlaceHolder
        {
            get { return _PlaceHolder; }
            set
            {
                this.OnPropertyValueChange("PlaceHolder");
                this._PlaceHolder = value;
            }
        }
        /// <summary>
        /// _1单行 2多行 3数字 4日期 5时间 6手机号 7单项选择 8多项选择 9下拉框 10地理位置 11上传单图 12上传多图 13省/市/区 14手写签名 15标签
        /// </summary>
        [Field("Type")]
        public int? Type
        {
            get { return _Type; }
            set
            {
                this.OnPropertyValueChange("Type");
                this._Type = value;
            }
        }
        /// <summary>
        /// 最小文本数
        /// </summary>
        [Field("MinTextCount")]
        public int? MinTextCount
        {
            get { return _MinTextCount; }
            set
            {
                this.OnPropertyValueChange("MinTextCount");
                this._MinTextCount = value;
            }
        }
        /// <summary>
        /// 最大文本数
        /// </summary>
        [Field("MaxTextCount")]
        public int? MaxTextCount
        {
            get { return _MaxTextCount; }
            set
            {
                this.OnPropertyValueChange("MaxTextCount");
                this._MaxTextCount = value;
            }
        }
        /// <summary>
        /// 排序
        /// </summary>
        [Field("Sort")]
        public int? Sort
        {
            get { return _Sort; }
            set
            {
                this.OnPropertyValueChange("Sort");
                this._Sort = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("ActiveID")]
        public int? ActiveID
        {
            get { return _ActiveID; }
            set
            {
                this.OnPropertyValueChange("ActiveID");
                this._ActiveID = value;
            }
        }
        /// <summary>
        /// 创建人
        /// </summary>
        [Field("CreateUserID")]
        public int? CreateUserID
        {
            get { return _CreateUserID; }
            set
            {
                this.OnPropertyValueChange("CreateUserID");
                this._CreateUserID = value;
            }
        }
        /// <summary>
        /// 创建时间
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
        [Field("Status")]
        public int? Status
        {
            get { return _Status; }
            set
            {
                this.OnPropertyValueChange("Status");
                this._Status = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("Options")]
        public string Options
        {
            get { return _Options; }
            set
            {
                this.OnPropertyValueChange("Options");
                this._Options = value;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        [Field("require")]
        public int? require
        {
            get { return _require; }
            set
            {
                this.OnPropertyValueChange("require");
                this._require = value;
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
                _.Name,
                _.PlaceHolder,
                _.Type,
                _.MinTextCount,
                _.MaxTextCount,
                _.Sort,
                _.ActiveID,
                _.CreateUserID,
                _.CreateTime,
                _.Status,
                _.Options,
                _.require,
            };
        }
        /// <summary>
        /// 获取值信息
        /// </summary>
        public override object[] GetValues()
        {
            return new object[] {
                this._ID,
                this._Name,
                this._PlaceHolder,
                this._Type,
                this._MinTextCount,
                this._MaxTextCount,
                this._Sort,
                this._ActiveID,
                this._CreateUserID,
                this._CreateTime,
                this._Status,
                this._Options,
                this._require,
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
            public readonly static Field All = new Field("*", "CustomField");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field ID = new Field("ID", "CustomField", "");
            /// <summary>
			/// 标题
			/// </summary>
			public readonly static Field Name = new Field("Name", "CustomField", "标题");
            /// <summary>
			/// 提示文本
			/// </summary>
			public readonly static Field PlaceHolder = new Field("PlaceHolder", "CustomField", "提示文本");
            /// <summary>
			/// _1单行 2多行 3数字 4日期 5时间 6手机号 7单项选择 8多项选择 9下拉框 10地理位置 11上传单图 12上传多图 13省/市/区 14手写签名 15标签
			/// </summary>
			public readonly static Field Type = new Field("Type", "CustomField", "_1单行 2多行 3数字 4日期 5时间 6手机号 7单项选择 8多项选择 9下拉框 10地理位置 11上传单图 12上传多图 13省/市/区 14手写签名 15标签");
            /// <summary>
			/// 最小文本数
			/// </summary>
			public readonly static Field MinTextCount = new Field("MinTextCount", "CustomField", "最小文本数");
            /// <summary>
			/// 最大文本数
			/// </summary>
			public readonly static Field MaxTextCount = new Field("MaxTextCount", "CustomField", "最大文本数");
            /// <summary>
			/// 排序
			/// </summary>
			public readonly static Field Sort = new Field("Sort", "CustomField", "排序");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field ActiveID = new Field("ActiveID", "CustomField", "");
            /// <summary>
			/// 创建人
			/// </summary>
			public readonly static Field CreateUserID = new Field("CreateUserID", "CustomField", "创建人");
            /// <summary>
			/// 创建时间
			/// </summary>
			public readonly static Field CreateTime = new Field("CreateTime", "CustomField", "创建时间");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field Status = new Field("Status", "CustomField", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field Options = new Field("Options", "CustomField", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field require = new Field("require", "CustomField", "");
        }
        #endregion
    }

    public partial class CustomFieldModel
    {
        public string Value { get; set; }
    }

}