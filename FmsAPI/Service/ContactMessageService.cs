using FmsAPI.Data;
using FmsAPI.Interface;
using FmsAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace FmsAPI.Service
{
    public class ContactMessageService : IContactMessageService
    {
        private readonly FarmManagementSystemEntities _context;

        public ContactMessageService()
        {
            _context = new FarmManagementSystemEntities();
        }

        public async Task<List<ContactMessage>> GetAllMessagesAsync()
        {
            return await _context.ContactMessages.ToListAsync();
        }

        public async Task<ContactMessage> AddMessageAsync(ContactMessage message)
        {
            message.SubmittedAt = DateTime.Now;
            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}
