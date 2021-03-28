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
        *Receive credentials data from controller and inserts them into the MYSQL database
        *@param {User} user
        *returns User object
        */
        User CreateUser(User user);
        /*
        *Receive user data to get all users except current user
        *@param {User} user
        *returns User object List
        */
        List<User> GetAllUsers(User user);
        /*
        *Receive credentials data from controller and inserts them into the MYSQL database
        *@param {Credentials} credentials
        *returns User object
        */
        User AuthenticateUser(Credentials credentials);

        /*
        *Receive credentials data from controller and returns found user's 
        *security question from MYSQL database to verify user for a password reset. 
        *@param {Credentials} credentials
        *returns User object
        */
        User ReadUser(Credentials credentials);
 

        /*
        *Receive user data from controller and returns user's db answer
        *to verify input answer matches with answer found in database
        *@param {User} user
        *returns string
        */
        string UserSecurityQuestionAnswer(User user);

        /*
        *Receive new user's password data from controller and 
        *returns a bool to verify user password has been updated.
        *@param {Credentials} credentials
        *returns bool
        */
        bool ResetUserPassword(Credentials credentials);
        /*
       *Receive user data from controller to delete user from the database
       *@param {User} user
       *returns boolean
       */
        bool DeleteUser(User user);
        /*
       *Receive user data from controller to suspend user from the site in the database
       *@param {User} user
       *returns boolean
       */
        bool SuspendUser(User user);
        /*
        *Receive user id data from controller to retrieve search history
        *@param int userId
        *returns string array
        */
        string[] GetRecentSearches(int userId);
        /*
        *Receive searchkey object data from controller to update user's search histroy string 
        *@param {SearchKey} searchkey
        *returns string
        */
        string UpdateRecentSearches(SearchKey searchKey);
    };
}
 