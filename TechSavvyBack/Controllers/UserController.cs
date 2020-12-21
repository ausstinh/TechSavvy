using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TechSavvyBack.Business;
using TechSavvyBack.Models;

namespace TechSavvy.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        //instance of the user business service
        UserBusinessInterface businessService = new UserBusinessInterface();
        /*
         *Recieve credentials data from login js page on the React app and inserts them into the MYSQL database
         *@param {Credentials} credentials
         *returns response object
         */
        [Route("AuthenticateUser")]
        [HttpPost]
        public Response AuthenticateUser(Credentials credentials)
        {
            //check if user exists in the database
            var result = businessService.AuthenticateUser(credentials);

            if (result == null)
            {
                //send a response back to login page that user was not found
                return new Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
            {
                //send a response back to login page that user was found                
                return new Response { Status = "Success", Message = "Login Successfully", };
            }
               
        }
        /*
         *Recieve credentials data from login js page on the React app and inserts them into the MYSQL database
         *@param {User} user
         *returns response object
         */
        [Route("CreateUser")]
        [HttpPost]
        public Response CreateUser(User user)
        {
            var result = businessService.CreateUser(user);
            if (result == null)
            {
                return new Response { Status = "Invalid", Message = "Invalid User." };
            }
            else
            {
                return new Response { Status = "Success", Message = "User Created" , User = (User) result };
            }

        }
    }
}
