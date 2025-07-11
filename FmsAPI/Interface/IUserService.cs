using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IUserService
    {
        Task<string> RegisterAsync(User user);
        Task<string> LoginAsync(string email, string password);
        Task<string> SendOtpAsync(string email);
    }
}
