using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechSavvyBack.Models;

namespace TechSavvyBack.Data
{
    public class UserDataService : UserDataInterface
    {
        //This is my connection string i have assigned the database file address path  
        readonly MySqlConnection connection = new MySqlConnection("server=localhost;port=3306;user=root;password=root;database=techsavvy");
        /*
         * Please view method description in UserDataInterface
        */
        public User Authenticate(Credentials credentials)
        {

            User loggedInUser = new User();

            string queryString = "SELECT * FROM users WHERE EMAIL = @EMAIL";

            using (connection)
            {
                //create command to find user with credentails
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = credentials.Email;
               
                try
                {
                    //execute command 
                    connection.Open();
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read()) 
                        {
                            //verify password is the same before continuing
                            if (!BCrypt.Net.BCrypt.Verify(credentials.Password, reader.GetString(2)))
                            {
                                //return null if passwords don't match
                                return null;
                            }
                            //create user object based from returned row
                            loggedInUser = new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4), reader.GetString(5), reader.GetInt32(6), reader.GetInt32(7), reader.GetDateTime(8), reader.GetDateTime(9), reader.GetString(10));
                        }
                        
                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            //return found user
            return loggedInUser;
        }
        /*
         * Please view method description in UserDataInterface
        */
        public User Create(User user)
        {
            User loggedInUser = new User();
            string queryString = "SELECT * FROM users WHERE EMAIL = @EMAIL";
            
            using (connection)
            {
                //create command to create user with credentials
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = user.Email;

                try
                {
                    //execute command
                    connection.Open();
                    MySqlDataReader reader = command.ExecuteReader();
                    //check if email is already taken
                    using (reader)
                    {
                        if (reader.HasRows)
                        {
                            connection.Close();
                            return null;
                        }
                    }
                        //create new user with credentials
                        queryString = "INSERT INTO users (USERNAME, PASSWORD, EMAIL, QUESTION, ANSWER, ISSUSPENDED, ADMINISTRATORROLE, ACCOUNTCREATEDAT, LASTLOGINAT, RECENTSEARCHES) VALUES (@USERNAME, @PASSWORD, @EMAIL, @QUESTION, @ANSWER, @ISSUSPENDED, @ADMINISTRATORROLE, @ACCOUNTCREATEDAT, @LASTLOGINAT, @RECENTSEARCHES)";

                        command = new MySqlCommand(queryString, connection);

                        command.Parameters.Add("@QUESTION", MySqlDbType.VarChar, 100).Value = user.Question;
                        command.Parameters.Add("@ANSWER", MySqlDbType.VarChar, 100).Value = user.Answer;
                        command.Parameters.Add("@USERNAME", MySqlDbType.VarChar, 100).Value = user.Username;
                        command.Parameters.Add("@PASSWORD", MySqlDbType.VarChar, 200).Value = user.Password;
                        command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = user.Email;
                        command.Parameters.Add("@ISSUSPENDED", MySqlDbType.Int32, 4).Value = 0;
                        command.Parameters.Add("@ADMINISTRATORROLE", MySqlDbType.Int32, 11).Value = 0;
                        command.Parameters.Add("@ACCOUNTCREATEDAT", MySqlDbType.DateTime).Value = DateTime.Now;
                        command.Parameters.Add("@LASTLOGINAT", MySqlDbType.DateTime).Value = DateTime.Now;
                        command.Parameters.Add("@RECENTSEARCHES", MySqlDbType.VarChar, 500).Value = "";
                    
                        //execute command
                        reader = command.ExecuteReader();
                        //check if new user was created
                        if (reader.RecordsAffected > 0)
                        {
                            reader.Close();
                            //attempt to get the new user from the database and return them
                            queryString = "SELECT * FROM users WHERE EMAIL = @EMAIL";
                            command = new MySqlCommand(queryString, connection);
                            command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = user.Email;

                            reader = command.ExecuteReader();
                            while (reader.Read())
                            {
                                 //make user object based on found user
                                 loggedInUser = new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4), reader.GetString(5), reader.GetInt32(6), reader.GetInt32(7), reader.GetDateTime(8), reader.GetDateTime(9), reader.GetString(10));
                            }
                          reader.Close();
                        }
                        else
                            loggedInUser = null;
                    reader.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    connection.Close();
                    return null;
                }
              connection.Close();
            }           
            return loggedInUser;
        }
        /*
        * Please view method description in UserDataInterface
        */
        public bool Delete(User user)
        {
            string queryString = "SELECT * FROM user_jobs WHERE users_id = @ID";
            bool success = false;
            using (connection)
            {
                //create command to delete job
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@ID", MySqlDbType.Int32, 100).Value = user.Id;

                try
                {
                    connection.Open();
                    MySqlDataReader reader = command.ExecuteReader();
                    //check if the user has jobs saved then delete them
                    if (reader.HasRows)
                    {                      
                        reader.Close();
                        queryString = "DELETE * FROM user_jobs WHERE users_id = @ID";
                        command = new MySqlCommand(queryString, connection);
                        command.Parameters.Add("@ID", MySqlDbType.Int32, 100).Value = user.Id;
                        reader = command.ExecuteReader();

                        if (reader.RecordsAffected > 0)
                        {
                            reader.Close();
                            queryString = "DELETE * FROM users WHERE ID = @ID";
                            command = new MySqlCommand(queryString, connection);
                            command.Parameters.Add("@ID", MySqlDbType.Int32, 100).Value = user.Id;
                            reader = command.ExecuteReader();
                            if (reader.RecordsAffected > 0)
                            {
                                success = true;
                            }
                        }
                    }
                    else
                    {
                        //delete user
                        reader.Close();
                        queryString = "DELETE FROM users WHERE ID = @ID";
                        command = new MySqlCommand(queryString, connection);
                        command.Parameters.Add("@ID", MySqlDbType.Int32, 100).Value = user.Id;
                        reader = command.ExecuteReader();
                        if (reader.RecordsAffected > 0)
                        {
                            success = true;
                        }
                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            return success;
        }
        /*
        * Please view method description in UserDataInterface
        */
        public string[] GetRecentSearches(int userId)
        {
            throw new NotImplementedException();
        }
        /*
        * Please view method description in UserDataInterface
        */
        public User Read(Credentials credentials)
        {       
                User user = new User();
                string queryString = "SELECT * FROM users WHERE EMAIL = @EMAIL";

                using (connection)
                {
                    //create command to find user with email
                    MySqlCommand command = new MySqlCommand(queryString, connection);
                    command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = credentials.Email;

                    try
                    {
                        connection.Open();
                        MySqlDataReader reader = command.ExecuteReader();

                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                               //create user object based on found user
                                user = new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4), reader.GetString(5), reader.GetInt32(6), reader.GetInt32(7), reader.GetDateTime(8), reader.GetDateTime(9), reader.GetString(10));
                            }

                        }
                        reader.Close();
                        connection.Close();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message);
                    }
                }
                return user;
        }

        /*
        * Please view method description in UserDataInterface
        */
        public List<User> ReadAll(User user)
        {
            string queryString = "SELECT * FROM users WHERE ID <> @ID";
            List<User> users = new List<User>();
            using (connection)
            {
                //create command to find user with email
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@ID", MySqlDbType.VarChar, 100).Value = user.Id;

                try
                {
                    connection.Open();
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            //create user object based on found user
                            users.Add(new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(3), reader.GetInt32(6), reader.GetInt32(7), reader.GetDateTime(8), reader.GetDateTime(9)));
                        }

                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            return users;
        }
        /*
        * Please view method description in UserDataInterface
        */
        public string ReadAnswer(User user)
        {
            User loggedInUser = new User();         
            string queryString = "SELECT * FROM users WHERE EMAIL = @EMAIL";

            using (connection)
            {
                //create command with inputted email
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = user.Email;

                try
                {
                    connection.Open();
                    //execute command
                    MySqlDataReader reader = command.ExecuteReader();
                    //check if user has been found
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                           //create user object based from found user
                            loggedInUser = new User(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4), reader.GetString(5), reader.GetInt32(6), reader.GetInt32(7), reader.GetDateTime(8), reader.GetDateTime(9), reader.GetString(10));
                        }

                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            //return just the user's answer
            return loggedInUser.Answer;
        }
        /*
        * Please view method description in UserDataInterface
        */
        public bool SuspendUser(User user)
        {
            //check if the user's password is updated or not
            bool success = false;
            string queryString = "UPDATE users SET ISSUSPENDED = @SUSPENDED WHERE ID = @ID";

            using (connection)
            {
                //create command with new password to update user's password
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@ID", MySqlDbType.Int32, 200).Value = user.Id;
                if (user.IsSuspended == 0)
                command.Parameters.Add("@SUSPENDED", MySqlDbType.Int32, 200).Value = 1;
                else
                command.Parameters.Add("@SUSPENDED", MySqlDbType.Int32, 200).Value = 0;

                try
                {
                    connection.Open();
                    //execute command
                    MySqlDataReader reader = command.ExecuteReader();

                    //check if user has been updated
                    if (reader.RecordsAffected > 0)
                    {
                        success = true;
                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            return success;
        }
        /*
        * Please view method description in UserDataInterface
        */
        public User Update(User user)
        {
            throw new NotImplementedException();
        }
        /*
        * Please view method description in UserDataInterface
        */
        public bool Update(Credentials credentials)
        {
            //check if the user's password is updated or not
            bool success = false;
            string queryString = "UPDATE users SET PASSWORD = @PASSWORD WHERE EMAIL = @EMAIL";

            using (connection)
            {
                //create command with new password to update user's password
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@PASSWORD", MySqlDbType.VarChar, 200).Value = credentials.Password;
                command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = credentials.Email;
            
                try
                {
                    connection.Open();
                    //execute command
                    MySqlDataReader reader = command.ExecuteReader();

                    //check if user has been updated
                    if (reader.RecordsAffected > 0)
                    {
                        success = true;
                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            return success;
        }

        public string UpdateRecentSearches(SearchKey searchKey)
        {
            string recentSearches = null;         
            
            string queryString = "SELECT * FROM users WHERE EMAIL = @EMAIL";

            using (connection)
            {
                //create command to find user with email
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = searchKey.User.Email;

                try
                {
                    connection.Open();
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            //create user object based on found user
                            recentSearches = reader.GetString(10);
                        }
                        reader.Close();
                        if (searchKey.DeleteRecentSearches)
                        {
                            queryString = "UPDATE users SET RECENTSEARCHES = '' WHERE EMAIL = @EMAIL";
                        }
                        else
                        {
                            queryString = "UPDATE users SET RECENTSEARCHES = @RECENTSEARCHES WHERE EMAIL = @EMAIL";
                        }

                        //create command with new password to update user's password
                        command = new MySqlCommand(queryString, connection);                       
                        command.Parameters.Add("@EMAIL", MySqlDbType.VarChar, 100).Value = searchKey.User.Email;
                        if (!searchKey.DeleteRecentSearches)
                        {
                            if (recentSearches != "")
                                command.Parameters.Add("@RECENTSEARCHES", MySqlDbType.VarChar, 100).Value = recentSearches + "," + searchKey.Key;
                            else
                                command.Parameters.Add("@RECENTSEARCHES", MySqlDbType.VarChar, 100).Value = searchKey.Key;
                        }
                        reader = command.ExecuteReader();
                        if (reader.RecordsAffected > 0 && !searchKey.DeleteRecentSearches)
                        {
                            searchKey.User.RecentSearches = recentSearches + "," + searchKey.Key;
                            reader.Close();                            
                        }
                        else if(reader.RecordsAffected > 0 && searchKey.DeleteRecentSearches)
                        {
                            searchKey.User.RecentSearches = "";
                            reader.Close();
                        }
                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            return searchKey.User.RecentSearches;
        }
    }
}
