using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechSavvyBack.Data;
using TechSavvyBack.Models;

namespace TechSavvyBack.Business
{
    public class UserBusinessService : UserBusinessInterface
    {
        //userDataService instance to send data to
        public UserDataService service = new UserDataService();

        /*
        * Please view method description in UserBusinessInterface
        */
        public User AuthenticateUser(Credentials credentials)
        {
            return service.Authenticate(credentials);
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public User CreateUser(User user)
        {
            return service.Create(user);
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public bool DeleteUser(int userId)
        {
            return service.Delete(userId);
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public User EditProfile(User user)
        {
            return service.Update(user);
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public User[] GetAllUsers()
        {
            return GetAllUsers();
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public string[] GetRecentSearches(int userId)
        {
            throw new NotImplementedException();
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public User ReadUser(Credentials credentials)
        {
            return service.Read(credentials);
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public bool ResetUserPassword(Credentials credentials)
        {
            return service.Update(credentials);
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public bool SuspendUser(int userId)
        {
            return service.SuspendUser(userId);
        }
        /*
        * Please view method description in UserBusinessInterface
        */
        public string UserSecurityQuestionAnswer(User user)
        {
            return service.ReadAnswer(user);
        }
    }
}
