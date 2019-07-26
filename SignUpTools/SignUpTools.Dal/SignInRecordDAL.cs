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
using System.Data.SqlClient;
using LeoTools.Extension;

namespace SignUpTools.DAL
{
    /// <summary>
    /// 实体类SignInRecord。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class SignInRecordDAL : SqlProvider<SignInRecordModel>
    {
        public static SignInRecordDAL dal = new SignInRecordDAL();
        public bool DeleteSignInRecord(Expression<Func<SignInRecordModel, bool>> expression)
        {
            return Delete(expression);
        }

        public bool DeleteSignInRecord(int id)
        {
            return Delete(m => m.ID == id);
        }

        public SignInRecordModel GetSignInRecordModel(Expression<Func<SignInRecordModel, bool>> expression)
        {
            return GetEntity(expression);
        }

        public SignInRecordModel GetSignInRecordModel(int id)
        {
            return GetEntity(m => m.ID == id);
        }

        public List<SignInRecordModel> GetSignInRecordModels(Expression<Func<SignInRecordModel, bool>> expression)
        {
            return GetList(expression);
        }

        public List<SignInRecordModel> GetSignInRecordByUser(int activeid, int userid)
        {
            string sql = $@"
select 
t.*, 
t1.UserName CreateUserName, 
t1.Avatars CreateUserAvatars from SignInRecord t 
left join [User] t1 on t.CreateUserID=t1.ID 
where t.ActiveID={activeid} and t.CreateUserID={userid} order by t.CreateTime desc ";

            return Context.FromSql(sql).ToList<SignInRecordModel>();
        }

        public List<SignInRecordModel> GetSignInRecordsByActiveID(int ActiveID,int lt, PageFliter pageFliter)
        {
            string sql = $@"
select 
t.*, 
t1.UserName CreateUserName, 
t1.Avatars CreateUserAvatars from SignInRecord t 
left join [User] t1 on t.CreateUserID=t1.ID 
where t.ActiveID={ActiveID}  ";
            if (lt == -1)
            {
                sql += " order by t.CreateTime desc";
            }
            else
            {
                sql += " order by t.UpdateTime desc";
            }
            return Context.FromSql(sql).ToList<SignInRecordModel>().GetPage(pageFliter);
        }

        public bool InsertSignInRecordModel(SignInRecordModel entity)
        {
            return Insert(entity);
        }

        public bool InsertSignInRecordModel(List<SignInRecordModel> entities)
        {
            return Insert(entities);
        }

        public bool UpdateSignInRecordModel(SignInRecordModel entity)
        {
            return Update(entity);
        }

        public bool UpdateSignInRecordModel(Dictionary<Field, object> fields, Expression<Func<SignInRecordModel, bool>> expression)
        {
            return Update(fields, expression);
        }

        public bool InserSignInRecordByTran(ActivesModel model,SignInRecordModel signInRecordModel,List<CustomFieldValueModel> values)
        {
            
            SqlConnection connection = new SqlConnection(ConnStr);
            connection.Open();
            var tran = connection.BeginTransaction();
            try
            {
                Context.Update(tran, model);
                int id = Context.Insert(tran, signInRecordModel);
                values.ForEach(m => m.SignInID = id);
                signInRecordModel.ID = id;
                Context.Insert(tran, values);
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

        public bool UpdateSignInRecordByTran( List<CustomFieldValueModel> values,int infoid)
        {

            SqlConnection connection = new SqlConnection(ConnStr);
            connection.Open();
            var tran = connection.BeginTransaction();
            try
            {
                Context.Delete<CustomFieldValueModel>(tran, m => m.SignInID == infoid);
                values.ForEach(m => m.SignInID = infoid);
                Context.Insert(tran, values);
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

        public bool ExitSignIn(int infoid)
        {
            var model = GetSignInRecordModel(infoid);
            int totalCount = Context.Count<SignInRecordModel>(m => m.ActiveID == model.ActiveID);
            SqlConnection connection = new SqlConnection(ConnStr);
            connection.Open();
            var tran = connection.BeginTransaction();
            try
            {
                Context.Delete<SignInRecordModel>(tran, m => m.ID == infoid);
                Context.Update(tran, new ActivesModel()
                {
                    ID = model.ActiveID.Value,
                    SignInCount = (totalCount - 1) <= 0 ? 0 : totalCount - 1
                });
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

        public List<SignInRecordModel> GetAllSignInRecord(int eid,PageFliter pageFliter)
        {
            string sql = $@"select t2.*,
(select cast(ID as nvarchar(64))+'!|' from CustomField where t2.ActiveID=ActiveID  order by Sort asc for xml Path('')) as fieldKeys,
(select [Name]+'!|' from CustomField where t2.ActiveID=ActiveID  order by Sort asc for xml Path('')) as fieldNames,
(select cast(t1.[Value] as nvarchar(max))+'!|' from CustomField t
left join CustomFieldValue t1 on t.ID=t1.CustomFieldID
where t2.ActiveID=t.ActiveID and t1.SignInID=t2.ID for xml Path('')) as fieldVals
from SignInRecord t2
where t2.ActiveID={eid} order by t2.CreateTime desc";
            return Context.FromSql(sql).ToList<SignInRecordModel>().GetPage(pageFliter);
        }

    }
}