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
using SignUpTools.DAL;
using SignUpTools.Model;

namespace SignUpTools.Bussiness
{
    /// <summary>
    /// 实体类ActivesManageApply。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class ActivesManageApplyBussiness
    {
        public static bool DeleteActivesManageApply(Expression<Func<ActivesManageApplyModel, bool>> expression)
        {
            return ActivesManageApplyDAL.dal.DeleteActivesManageApply(expression);
        }

        public static bool DeleteActivesManageApply(int id)
        {
            return ActivesManageApplyDAL.dal.DeleteActivesManageApply(m => m.ID == id);
        }

        public static ActivesManageApplyModel GetActivesManageApplyModel(Expression<Func<ActivesManageApplyModel, bool>> expression)
        {
            return ActivesManageApplyDAL.dal.GetActivesManageApplyModel(expression);
        }

        public static ActivesManageApplyModel GetActivesManageApplyModel(int id)
        {
            return ActivesManageApplyDAL.dal.GetActivesManageApplyModel(m => m.ID == id);
        }

        public static List<ActivesManageApplyModel> GetActivesManageApplyModels(Expression<Func<ActivesManageApplyModel, bool>> expression)
        {
            return ActivesManageApplyDAL.dal.GetActivesManageApplyModels(expression);
        }

        public static bool InsertActivesManageApplyModel(ActivesManageApplyModel entity)
        {
            return ActivesManageApplyDAL.dal.InsertActivesManageApplyModel(entity);
        }

        public static bool InsertActivesManageApplyModel(List<ActivesManageApplyModel> entities)
        {
            return ActivesManageApplyDAL.dal.InsertActivesManageApplyModel(entities);
        }

        public static bool UpdateActivesManageApplyModel(ActivesManageApplyModel entity)
        {
            return ActivesManageApplyDAL.dal.UpdateActivesManageApplyModel(entity);
        }

        public static bool UpdateActivesManageApplyModel(Dictionary<Field, object> fields, Expression<Func<ActivesManageApplyModel, bool>> expression)
        {
            return ActivesManageApplyDAL.dal.UpdateActivesManageApplyModel(fields, expression);
        }


    }
}