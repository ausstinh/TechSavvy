﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechSavvyBack.Models;

namespace TechSavvyBack.Data
{
    public interface UserDataInterface
    {
        /*
        *Recieve credentials data from user business service and inserts them into the MYSQL database
        *@param {User} user
        *returns User object
        */
        User Create(User user);
        /*
         *Recieve credentials data from user business service and inserts them into the MYSQL database
         *@param {Credentials} credentials
         *returns User object
        */
        User Authenticate(Credentials credentials);
        /*
        *Recieve credentials data from user business service and returns found user's 
        *security question from MYSQL database to verify user for a password reset. 
        *@param {Credentials} credentials
        *returns User object
        */
        User Read(Credentials credentials);
        /*
        *Not used yet
        */
        User Update(User user);
        /*
        *Recieve new user's password data from user business service and 
        *returns a bool to verify user password has been updated.
        *@param {Credentials} credentials
        *returns bool
        */
        bool Update(Credentials credentials);
        /*
        *Recieve user data from user business service and returns user's db answer
        *to verify input answer matches with answer found in database
        *@param {User} user
        *returns string
        */
        string ReadAnswer(User user);
        /*
        *Receive user data to get all users except current user
        *@param {User} user
        *returns User object List
        */
        List<User> ReadAll(User user);
        /*
        *Receive user data from controller to delete user from the database
        *@param {User} user
        *returns boolean
        */
        bool Delete(User user);
        /*
        *Receive user data from controller to suspend user from the site in the database
        *@param {User} user
        *returns boolean
        */
        bool SuspendUser(User user);
        /*
        *Updates the user's recent search keys in the database
        *@param {SearchKey} searchKey
        *returns string
        */
        string UpdateRecentSearches(SearchKey searchKey);
    }
}
