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
using System.Linq;
using System.Linq.Expressions;
using Dos.ORM;
using SignUpTools.Model;

namespace SignUpTools.DAL
{
    /// <summary>
    /// 实体类CustomField。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class CustomFieldDAL : SqlProvider<CustomFieldModel>
    {
        public static CustomFieldDAL dal = new CustomFieldDAL();
        public bool DeleteCustomField(Expression<Func<CustomFieldModel, bool>> expression)
        {
            return Delete(expression);
        }

        public bool DeleteCustomField(int id)
        {
            return Delete(m => m.ID == id);
        }

        public CustomFieldModel GetCustomFieldModel(Expression<Func<CustomFieldModel, bool>> expression)
        {
            return GetEntity(expression);
        }

        public CustomFieldModel GetCustomFieldModel(int id)
        {
            return GetEntity(m => m.ID == id);
        }

        public List<CustomFieldModel> GetCustomFieldModels(Expression<Func<CustomFieldModel, bool>> expression)
        {
            return GetList(expression);
        }

        public bool InsertCustomFieldModel(CustomFieldModel entity)
        {
            return Insert(entity);
        }

        public bool InsertCustomFieldModel(List<CustomFieldModel> entities)
        {
            return Insert(entities);
        }

        public bool UpdateCustomFieldModel(CustomFieldModel entity)
        {
            return Update(entity);
        }

        public bool UpdateCustomFieldModel(Dictionary<Field, object> fields, Expression<Func<CustomFieldModel, bool>> expression)
        {
            return Update(fields, expression);
        }

        public List<CustomFieldModel> GetustomFieldValueBySignIn(int activeid,int infoid)
        {
            string sql = $@"select t.*,t1.[Value] from CustomField t
left join CustomFieldValue t1 on t.ID = t1.CustomFieldID where t.ActiveID={activeid} and t1.SignInID={infoid} ";
            return Context.FromSql(sql).ToList<CustomFieldModel>().OrderBy(m => m.Sort).ToList();
        }

    }
}