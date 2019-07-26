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
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using Dos.ORM;
using LeoTools.Extension;
using SignUpTools.Model;

namespace SignUpTools.DAL
{
    /// <summary>
    /// 实体类Actives。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class ActivesDAL :SqlProvider<ActivesModel>
    {
        public static ActivesDAL dal = new ActivesDAL();
        public bool DeleteActive(Expression<Func<ActivesModel, bool>> expression)
        {
            return Delete(expression);
        }

        public bool DeleteActive(int id)
        {
            return Delete(m => m.ID == id);
        }

        public ActivesModel GetActivesModel(Expression<Func<ActivesModel, bool>> expression)
        {
            return GetEntity(expression);
        }

        public ActivesModel GetActivesModel(int id)
        {
            return GetEntity(m => m.ID == id);
        }

        public List<ActivesModel> GetActivesModels(Expression<Func<ActivesModel, bool>> expression, int PageSize = 20, int pageIndex = 1)
        {
            return GetList(expression, PageSize,pageIndex);
        }

        public List<ActivesModel> GetList(int type,int userid,PageFliter pageFliter)
        {
            string sql = "";
            if (type == 0)
            {
                sql = $"select * from Actives where CreateUserID={userid} order by CreateTime desc ";
            }
            else if (type == 1)
            {
                sql = $"select * from Actives t where exists(select 1 from SignInRecord where ActiveID=t.ID and CreateUserID={userid})  order by CreateTime desc ";
            }
            else if (type == 2)
            {
                sql = $"select * from Actives t where exists(select 1 from FavoriteActives where ActiveID=t.ID and CreateUserID={userid})  order by CreateTime desc ";
            }
            return Context.FromSql(sql).ToList<ActivesModel>().GetPage(pageFliter).OrderByDescending(m=>m.CreateTime).ToList();
        }

        public bool InsertActiveModel(ActivesModel entity)
        {
            return Insert(entity);
        }

        public bool InsertActiveModel(List<ActivesModel> entities)
        {
            return Insert(entities);
        }

        public bool UpdateActiveModel(ActivesModel entity)
        {
            return Update(entity);
        }

        public bool UpdateActiveModel(Dictionary<Field, object> fields, Expression<Func<ActivesModel, bool>> expression)
        {
            return Update(fields, expression);
        }

        public bool InserActiveByTran(ActivesModel activesModel ,List<CustomFieldModel> customFieldModels)
        {

            SqlConnection connection = new SqlConnection(ConnStr);
            connection.Open();
            var tran = connection.BeginTransaction();
            try
            {
               var id= Context.Insert(tran, activesModel);
                customFieldModels.ForEach(m =>
                {
                    m.ActiveID = id;
                    m.CreateTime = DateTime.Now;
                });
                activesModel.ID = id;
                Context.Insert(tran, customFieldModels);
                tran.Commit();
                connection.Close();
                return true;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                connection.Close();
                return false;
            }
        }

        public bool UpdateActiveByTran(ActivesModel activesModel, List<CustomFieldModel> customFieldModels)
        {

            SqlConnection connection = new SqlConnection(ConnStr);
            connection.Open();
            var tran = connection.BeginTransaction();
            try
            {
                Context.Update(tran, activesModel);

                customFieldModels.ForEach(m =>
                {
                    m.ActiveID = activesModel.ID;
                    m.CreateTime = DateTime.Now;
                });
                Context.Update(tran, customFieldModels);

                tran.Commit();
                connection.Close();
                return true;
            }
            catch (Exception)
            {
                tran.Rollback();
                connection.Close();
                return false;
            }
        }

    }
}