using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(cmcglynn_bugTracker.Startup))]
namespace cmcglynn_bugTracker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
