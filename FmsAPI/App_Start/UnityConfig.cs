using FmsAPI.Controllers;
using FmsAPI.Data;
using FmsAPI.Interface;
using FmsAPI.Service;
using System.Web.Http;
using Unity;
using Unity.Lifetime;
using Unity.WebApi;

namespace FmsAPI
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            container.RegisterType<IAnimalSerivce, AnimalService>();
            container.RegisterType<FarmManagementSystemEntities>();
            container.RegisterType<ICompanyService, CompanyService>();
            container.RegisterType<IVendorService, VendorService>();
            container.RegisterType<IIdLookupService, IdLookupService>();
            container.RegisterType<IIdLookupValuesService, IdLookupValuesService>();
            container.RegisterType<IRoleService, RoleService>();
            container.RegisterType<IPermissionService, PermissionService>();
            container.RegisterType<IUserRoleService, UserRoleService>();
            container.RegisterType<IRolePermissionService, RolePermissionService>();
            container.RegisterType<IInvestmentService, InvestmentService>();
            container.RegisterType<ILandPurchaseService, LandPurchaseService>();
            container.RegisterType<IAssetService, AssetService>();
            container.RegisterType<IFeedPurchaseService, FeedPurchaseService>();
            container.RegisterType<IFeedConsumptionService, FeedConsumptionService>();
            container.RegisterType<IProductionService, ProductionService>();
            container.RegisterType<IExpenseService, ExpenseService>();
            container.RegisterType<ICustomerService, CustomerService>();
            container.RegisterType<IOrderService, OrderService>();
            container.RegisterType<IWorkerService, WorkerService>();
            container.RegisterType<ISalaryService, SalaryService>();
            container.RegisterType<IContactMessageService, ContactMessageService>();
            container.RegisterType<IUserService, UserService>();














            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}