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
    /// 实体类ActiveManages。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class ActiveManagesDAL :SqlProvider<ActiveManagesModel>
    {
        public static ActiveManagesDAL dal = new ActiveManagesDAL();
        public bool DeleteActiveManages(Expression<Func<ActiveManagesModel, bool>> expression)
        {
            return Delete(expression);
        }

        public bool DeleteActiveManages(int id)
        {
            return Delete(m => m.ID == id);
        }

        public ActiveManagesModel GetActiveManagesModel(Expression<Func<ActiveManagesModel, bool>> expression)
        {
            return GetEntity(expression);
        }

        public ActiveManagesModel GetActiveManagesModel(int id)
        {
            return GetEntity(m => m.ID == id);
        }

        public List<ActiveManagesModel> GetActiveManagesModels(Expression<Func<ActiveManagesModel, bool>> expression)
        {
            return GetList(expression);
        }
        public List<ActiveManagesModel> GetListByActiveID(int eid)
        {
            string sql = $@"select t.*,t1.UserName CreateUserName,t1.Avatars from ActiveManages t left join [User] t1 on t.ManageUserID=t1.ID where t.ActiveID={eid} order by t.CreateTime desc ";
            return Context.FromSql(sql).ToList<ActiveManagesModel>();
        } 


        public List<ActiveManagesModel> GetList(int type,int userid,PageFliter pageFliter)
        {
            string sql = "";
            if (type == 0)
            {
                sql = $"select * from ActiveManages where CreateUserID={userid} order by CreateTime desc ";
            }
            else if (type == 1)
            {
                sql = $"select * from ActiveManages t where exists(select 1 from SignInRecord where ActiveID=t.ID and CreateUserID={userid})  order by CreateTime desc ";
            }
            else if (type == 2)
            {
                sql = $"select * from ActiveManages t where exists(select 1 from FavoriteActiveManages where ActiveID=t.ID and CreateUserID={userid})  order by CreateTime desc ";
            }
            return Context.FromSql(sql).ToList<ActiveManagesModel>().GetPage(pageFliter).OrderByDescending(m=>m.CreateTime).ToList();
        }

        public bool InsertActiveModel(ActiveManagesModel entity)
        {
            return Insert(entity);
        }

        public bool InsertActiveModel(List<ActiveManagesModel> entities)
        {
            return Insert(entities);
        }

        public bool UpdateActiveModel(ActiveManagesModel entity)
        {
            return Update(entity);
        }

        public bool UpdateActiveModel(Dictionary<Field, object> fields, Expression<Func<ActiveManagesModel, bool>> expression)
        {
            return Update(fields, expression);
        }

        public bool AddAdmin(ActiveManagesModel ActiveManagesModel ,ActivesManageApplyModel activesManageApplyModel)
        {

            SqlConnection connection = new SqlConnection(ConnStr);
            connection.Open();
            var tran = connection.BeginTransaction();
            try
            {
               var id= Context.Insert(tran, ActiveManagesModel);
                Context.Update(tran, activesManageApplyModel);
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

    }
}