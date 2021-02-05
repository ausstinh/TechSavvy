using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechSavvyBack.Models;

namespace TechSavvyBack.Business
{
    public interface UserBusinessInterface
    {
        /*
        *Recieve credentials data from controller and inserts them into the MYSQL database
        *@param {User} user
        *returns User object
        */
        User CreateUser(User user);
        /*
         *Not used yet
         */
        User[] GetAllUsers();
        /*
        *Recieve credentials data from controller and inserts them into the MYSQL database
        *@param {Credentials} credentials
        *returns User object
        */
        User AuthenticateUser(Credentials credentials);

        /*
        *Recieve credentials data from controller and returns found user's 
        *security question from MYSQL database to verify user for a password reset. 
        *@param {Credentials} credentials
        *returns User object
        */
        User ReadUser(Credentials credentials);
        /*
        *Not used yet
        */
        User EditProfile(User user);

        /*
        *Recieve user data from controller and returns user's db answer
        *to verify input answer matches with answer found in database
        *@param {User} user
        *returns string
        */
        string UserSecurityQuestionAnswer(User user);

        /*
        *Recieve new user's password data from controller and 
        *returns a bool to verify user password has been updated.
        *@param {Credentials} credentials
        *returns bool
        */
        bool ResetUserPassword(Credentials credentials);
        /*
        *Not used yet
        */
        bool DeleteUser(int userId);
        /*
        *Not used yet
        */
        bool SuspendUser(int userId);
        /*
        *Not used yet
        */
        string[] GetRecentSearches(int userId);
    };
}
 