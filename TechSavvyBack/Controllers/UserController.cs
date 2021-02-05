using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TechSavvyBack.Business;
using TechSavvyBack.Models;

namespace TechSavvy.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        //instance of the user business service
        UserBusinessService BusinessService = new UserBusinessService();
        /*
         *Recieve credentials data from login js page on the React app and inserts them into the MYSQL database
         *@param {Credentials} credentials
         *returns Response object
         */
        [HttpPost("{action}")]       
        public Response AuthenticateUser([FromBody]Credentials credentials)
        {
            //check if user exists in the database          
            var user = BusinessService.AuthenticateUser(credentials);

            if(user.Username == null)
            {
                //send a response back to login page that user was not found
                return new Response { Status = "invalid", Message = "invalid user." };
            }
            User session = new User(user.Id, user.Username, user.Email, user.IsSuspended, user.AdministartorRole, user.AccountCreatedAt, user.LastLoginAt, user.RecentSearches);
            return new Response { Status = "valid", Message = "user found.", User = session };

        }
        /*
         *Recieve credentials data from login js page and inserts them into the MYSQL database
         *@param {User} user
         *returns Response object
         */
        [HttpPost("{action}")]
        public Response CreateUser([FromBody] User user)
        {
            //hash user's password
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = passwordHash;

            var newUser = BusinessService.CreateUser(user);
            if (newUser.Username == null)
            {
                return new Response { Status = "invalid", Message = "Invalid User." };
            }
            else
            {
                User session = new User(newUser.Id, newUser.Username, newUser.Email, newUser.IsSuspended, newUser.AdministartorRole, newUser.AccountCreatedAt, newUser.LastLoginAt, newUser.RecentSearches);
                return new Response { Status = "success", Message = "User Created", User = session };
            }

        }
        /*
        *Recieve credentials data from find email js page and returns found user's 
        *security question from MYSQL database to verify user for a password reset. 
        *@param {Credentials} credentials
        *returns Response object
        */
        [HttpPost("{action}")]
        public Response VerifyEmail([FromBody] Credentials credentials)
        {
            //get user with credentials
            User user = BusinessService.ReadUser(credentials);

            //send a response back to js page with correct status
            if (user.Email == null)
            {
                return new Response { Status = "invalid", Message = "invalid email" };
            }
            //if found, send user's question back to find email js page
            return new Response { Status = "Success", Message = "User Found", Question = user.Question };
        }
        /*
        *Recieve user data from find email js page and returns Response object with status
        *to verify input answer matches with answer found in database
        *@param {User} user
        *returns Response object
        */
        [HttpPost("{action}")]
        public Response VerifyAnswer([FromBody] User user)
        {
            //compare input answer and db answer
            var currentAnswer = user.Answer;
            var dBAnswer = BusinessService.UserSecurityQuestionAnswer(user);

            //send a response back to js page with correct status if both answers match
            if (currentAnswer != dBAnswer)
            {              
                return new Response { Status = "invalid", Message = "invalid answer" };
            }
     
            return new Response { Status = "Success", Message = "Correct Answer"};
        }
        /*
        *Recieve new user's password data from find reset password js page and returns Response object with status
        *to verify password has been resetted
        *@param {Credentials} credentials
        *returns Response object
        */
        [HttpPost("{action}")]
        public Response ResetPassword([FromBody] Credentials credentials)
        {
            //hash user's new password
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(credentials.Password);
            credentials.Password = passwordHash;

            //updates user's password as new hash password
            bool success = BusinessService.ResetUserPassword(credentials);
            
            //send a response back to reset password js page with correct status
            if (!success)
            {               
                return new Response { Status = "invalid", Message = "invalid email" };
            }        
            return new Response { Status = "Success", Message = "User Updated" };
        }
    }
}
