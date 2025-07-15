using System.Collections.Generic;
using System.Linq;
using FmsAPI.Data;
using FmsAPI.Interface;

namespace FmsAPI.Service
{
  public class ExpenseService : IExpenseService
  {
    private readonly FarmManagementSystemEntities _context;

    public ExpenseService(FarmManagementSystemEntities context)
    {
      _context = context;
    }

    public List<Expens> GetAll()
    {
      return _context.Expenses.ToList();
    }

    public Expens GetById(int id)
    {
      return _context.Expenses.FirstOrDefault(e => e.ExpenseID == id);
    }

    public void Add(Expens expense)
    {
      _context.Expenses.Add(expense);
      _context.SaveChanges();
    }

    public void Update(Expens expense)
    {
      var existing = _context.Expenses.FirstOrDefault(e => e.ExpenseID == expense.ExpenseID);
      if (existing != null)
      {
        existing.Date = expense.Date;
        existing.Type = expense.Type;
        existing.Amount = expense.Amount;
        existing.LinkedFeedID = expense.LinkedFeedID;
        existing.LinkedAnimalID = expense.LinkedAnimalID;

        _context.SaveChanges();
      }
    }

    public void Delete(int id)
    {
      var expense = _context.Expenses.FirstOrDefault(e => e.ExpenseID == id);
      if (expense != null)
      {
        _context.Expenses.Remove(expense);
        _context.SaveChanges();
      }
    }
  }
}
