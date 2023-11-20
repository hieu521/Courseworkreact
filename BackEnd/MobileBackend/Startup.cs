using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MobileBackend.Extensions;
using MobileBackend.Middleware;

namespace MobileBackend
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            Configuration = InitConfiguration(env);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services
                .AddDatabase()
                .AddAutoMapper()
                .AddService()
                .AddSwagger();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MobileBackend v1"));
            }

            app.UseRouting();

            app.UseCors("AllowAll");

            // global error handler
            app.UseMiddleware<ErrorHandlerMiddleware>();

            // custom jwt auth middleware
            // app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
        
        // map dữ liêu trong cái section appseting in file appsetting.json vào cho class appsettings
        private IConfiguration InitConfiguration(IWebHostEnvironment env)
        {
            //Config the app read values from appsettings base on current environment values.
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
                .AddEnvironmentVariables().Build();
            //
            // Map AppSettings section in appsettings.json file value to AppSetting model
            configuration.GetSection("AppSettings").Get<AppSettings>(options => options.BindNonPublicProperties = true);
            return configuration;
        }
    }
}