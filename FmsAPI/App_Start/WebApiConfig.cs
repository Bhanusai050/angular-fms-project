using System.Web.Http;
using System.Web.Http.Cors;

namespace FmsAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // ✅ Enable CORS before routing
            var cors = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            config.EnableCors(cors);

            // ✅ Register attribute-based routes
            config.MapHttpAttributeRoutes();

            // ✅ Register conventional Web API routes
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
