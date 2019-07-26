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
    /// 实体类CustomOptions。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class CustomOptionsDAL : SqlProvider<CustomOptionsModel>
    {
        public static CustomOptionsDAL dal = new CustomOptionsDAL();
        public bool DeleteCustomOptions(Expression<Func<CustomOptionsModel, bool>> expression)
        {
            return Delete(expression);
        }

        public bool DeleteCustomOptions(int id)
        {
            return Delete(m => m.ID == id);
        }

        public CustomOptionsModel GetCustomOptionsModel(Expression<Func<CustomOptionsModel, bool>> expression)
        {
            return GetEntity(expression);
        }

        public CustomOptionsModel GetCustomOptionsModel(int id)
        {
            return GetEntity(m => m.ID == id);
        }

        public List<CustomOptionsModel> GetCustomOptionsModels(Expression<Func<CustomOptionsModel, bool>> expression)
        {
            return GetList(expression);
        }

        public bool InsertCustomOptionsModel(CustomOptionsModel entity)
        {
            return Insert(entity);
        }

        public bool InsertCustomOptionsModel(List<CustomOptionsModel> entities)
        {
            return Insert(entities);
        }

        public bool UpdateCustomOptionsModel(CustomOptionsModel entity)
        {
            return Update(entity);
        }

        public bool UpdateCustomOptionsModel(Dictionary<Field, object> fields, Expression<Func<CustomOptionsModel, bool>> expression)
        {
            return Update(fields, expression);
        }
    }
}