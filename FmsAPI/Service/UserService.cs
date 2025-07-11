using FmsAPI.Data;
using FmsAPI.Helpers;
using FmsAPI.Interface;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FmsAPI.Service
{
    public class UserService : IUserService
    {
        private readonly FarmManagementSystemEntities _context;

        public UserService(FarmManagementSystemEntities context)
        {
            _context = context;
        }

        public async Task<string> RegisterAsync(User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return "Email already registered.";
            }

            user.PasswordHash = HashHelper.HashPassword(user.PasswordHash);
            user.CreatedAt = DateTime.Now;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "Registration successful.";
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null || !HashHelper.VerifyPassword(password, user.PasswordHash))
            {
                return "Invalid email or password.";
            }

            return "Login successful.";
        }

        public async Task<string> SendOtpAsync(string email)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return "Email not found.";
            }

            var otp = new Random().Next(100000, 999999).ToString();

            var token = new PasswordResetToken
            {
                Email = email,
                OTP = otp,
                ExpiryTime = DateTime.Now.AddMinutes(10),
                IsUsed = false
            };

            _context.PasswordResetTokens.Add(token);
            await _context.SaveChangesAsync();

            // In real-world, you'd send the OTP using email service.
            return $"OTP sent to {email}: {otp}"; // For development/testing
        }
    }
}

