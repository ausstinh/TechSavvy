using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechSavvyBack.Models
{
    public class User
    {
        public User()
        {

        }
        public User(int id)
        {
            Id = id;
        }
        public User(int id, string username,  string email, int isSuspended, int administartorRole, DateTime accountCreatedAt, DateTime lastLoginAt, string question, string recentSearches)
        {
            Id = id;
            Username = username;
            IsSuspended = isSuspended;
            Email = email;
            AdministartorRole = administartorRole;
            AccountCreatedAt = accountCreatedAt;
            LastLoginAt = lastLoginAt;
            Question = question;
            RecentSearches = recentSearches;
        }
        public User(int id, string username, string email, int isSuspended, int administartorRole, DateTime accountCreatedAt, DateTime lastLoginAt)
        {
            Id = id;
            Username = username;
            IsSuspended = isSuspended;
            Email = email;
            AdministartorRole = administartorRole;
            AccountCreatedAt = accountCreatedAt;
            LastLoginAt = lastLoginAt;     
        }
        public User(string username, string password, string email, string question, string answer)
        {
            Username = username;
            Password = password;
            Email = email;
            Question = question;
            Answer = answer;
        }

        public User(int id, string username, string password, string email, string question, string answer, int isSuspended, int administartorRole,  DateTime accountCreatedAt, DateTime lastLoginAt, string recentSearches)
        {
            Id = id;
            Username = username;
            Password = password;
            Email = email;
            Question = question;
            Answer = answer;
            IsSuspended = isSuspended;
            AdministartorRole = administartorRole;
            AccountCreatedAt = accountCreatedAt;
            LastLoginAt = lastLoginAt;    
            RecentSearches = recentSearches;
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int IsSuspended { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int AdministartorRole { get; set; }
        public DateTime LastLoginAt {get; set;}
        public DateTime AccountCreatedAt { get; set; }
        public string RecentSearches { get; set; }
    }
}
