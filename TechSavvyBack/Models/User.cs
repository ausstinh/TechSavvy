using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechSavvyBack.Models
{
    public class User
    {
        int Id { get; set; }
        string Username { get; set; }
        string Password { get; set; }
        string Email { get; set; }
        string IsSuspended { get; set; }
        int AdministartorRole { get; set; }
        DateTime LastLoginAt {get; set;}
        DateTime AccountCreatedAt { get; set; }
        string[] RecentSearches { get; set; }

    }
}
