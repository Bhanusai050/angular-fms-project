using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FmsAPI.Models
{
    public class LoginResponse
    {
        public string AccessToken { get; set; }
        public string Email { get; set; }
    }
}