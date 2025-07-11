using FmsAPI.Data;
using FmsAPI.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Service
{
    public class PasswordResetTokenService: IPasswordResetTokenService
    {
        FarmManagementSystemEntities context = new FarmManagementSystemEntities();

        public List<PasswordResetToken> GetTokens()
        {
            return context.PasswordResetTokens.ToList();
        }

        public void AddToken(PasswordResetToken token)
        {
            context.PasswordResetTokens.Add(token);
            context.SaveChanges();
        }

        public bool DeleteToken(int id)
        {
            var token = context.PasswordResetTokens.Find(id);
            if (token == null)
                return false;

            context.PasswordResetTokens.Remove(token);
            context.SaveChanges();
            return true;
        }
    }
}