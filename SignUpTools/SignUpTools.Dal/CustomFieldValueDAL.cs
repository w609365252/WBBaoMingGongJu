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
using System.Collections.Generic;
using System.Linq.Expressions;
using Dos.ORM;
using SignUpTools.Model;

namespace SignUpTools.DAL
{
    /// <summary>
    /// 实体类CustomFieldValue。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class CustomFieldValueDAL : SqlProvider<CustomFieldValueModel>
    {
        public static CustomFieldValueDAL dal = new CustomFieldValueDAL();
        public bool DeleteCustomFieldValue(Expression<Func<CustomFieldValueModel, bool>> expression)
        {
            return Delete(expression);
        }

        public bool DeleteCustomFieldValue(int id)
        {
            return Delete(m => m.ID == id);
        }

        public CustomFieldValueModel GetCustomFieldValueModel(Expression<Func<CustomFieldValueModel, bool>> expression)
        {
            return GetEntity(expression);
        }

        public CustomFieldValueModel GetCustomFieldValueModel(int id)
        {
            return GetEntity(m => m.ID == id);
        }

        public List<CustomFieldValueModel> GetCustomFieldValueModels(Expression<Func<CustomFieldValueModel, bool>> expression)
        {
            return GetList(expression);
        }

        public bool InsertCustomFieldValueModel(CustomFieldValueModel entity)
        {
            return Insert(entity);
        }

        public bool InsertCustomFieldValueModel(List<CustomFieldValueModel> entities)
        {
            return Insert(entities);
        }

        public bool UpdateCustomFieldValueModel(CustomFieldValueModel entity)
        {
            return Update(entity);
        }

        public bool UpdateCustomFieldValueModel(Dictionary<Field, object> fields, Expression<Func<CustomFieldValueModel, bool>> expression)
        {
            return Update(fields, expression);
        }
    }
}