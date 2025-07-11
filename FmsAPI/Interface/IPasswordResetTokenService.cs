using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IPasswordResetTokenService
    {
        List<PasswordResetToken> GetTokens();
        void AddToken(PasswordResetToken token);
        bool DeleteToken(int id);
    }
}
