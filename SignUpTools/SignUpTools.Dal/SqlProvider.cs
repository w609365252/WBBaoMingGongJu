using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Dos.ORM;

namespace SignUpTools.DAL
{
    public class SqlProvider<TEntity> where TEntity : Entity
    {
        public static readonly DbSession Context = new DbSession("DosConn");
        public static readonly string ConnStr = ConfigurationManager.ConnectionStrings["DosConn"].ToString();

        protected bool Insert(TEntity entity)
        {
            return Context.Insert(entity) > 0;
        }

        protected bool Insert(List<TEntity> entities)
        {
            return Context.Insert(entities) > 0;
        }

        protected bool Update(TEntity entity)
        {
            return Context.Update(entity) > 0;
        }

        protected bool Update(Dictionary<Field, object> user, Expression<Func<TEntity, bool>> expression)
        {
            return Context.Update(user, expression) > 0;
        }

        protected bool Delete(Expression<Func<TEntity, bool>> expression)
        {
            return Context.Delete<TEntity>(expression) > 0;
        }

        protected List<TEntity> GetList(Expression<Func<TEntity, bool>> expression,int PageSize=20,int pageIndex=1)
        {
            return Context.From<TEntity>()
                .Page(PageSize, pageIndex)
                .Where(expression)
                .ToList();
        }

        protected TEntity GetEntity(Expression<Func<TEntity, bool>> expression)
        {
            return Context.From<TEntity>().Where(expression).First();
        }
    }
}
