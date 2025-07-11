using FmsAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FmsAPI.Interface
{
    public interface IContactMessageService
    {
        Task<ContactMessage> AddMessageAsync(ContactMessage contactMessage);
        Task<List<ContactMessage>> GetAllMessagesAsync();
    }
}
