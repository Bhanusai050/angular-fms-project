using System;
using System.Security.Cryptography;
using System.Text;

namespace FmsAPI.Helpers
{
    public static class HashHelper
    {
        public static string HashPassword(string password)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        public static bool VerifyPassword(string inputPassword, string hashedPassword)
        {
            var hashOfInput = HashPassword(inputPassword);
            return hashedPassword == hashOfInput;
        }
    }
}
