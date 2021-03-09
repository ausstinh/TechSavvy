using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechSavvyBack.Models;

namespace TechSavvyBack.Data
{
    public class JobDataService : JobDataInterface
    {
        //This is my connection string i have assigned the database file address path  
        readonly MySqlConnection connection = new MySqlConnection("server=localhost;port=3306;user=root;password=root;database=techsavvy");
        /*
        * Please view method description in JobDataInterface
        */
        public int Create(Job job)
        {
            int success = 0;
            User user = new User();
            string queryString = "SELECT * FROM user_jobs WHERE JOBID = @JOBID AND users_id = @USERSID";

            using (connection)
            {
                //create command to find user with email
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@JOBID", MySqlDbType.VarChar, 100).Value = job.id;
                command.Parameters.Add("@USERSID", MySqlDbType.Int32, 100).Value = job.users_id;

                try
                {
                    connection.Open();
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        success = 1;
                        reader.Close();
                    }
                    else
                    {
                        reader.Close();
                        queryString = "INSERT INTO user_jobs (JOBID, TITLE, TYPE, DESCRIPTION, COMPANY, COMPANYURL, JOBURL, LOCATION, HOWTOAPPLY, COMPANYLOGO, users_id) VALUES (@JOBID, @TITLE, @TYPE, @DESCRIPTION, @COMPANY, @COMPANYURL, @JOBURL, @LOCATION, @HOWTOAPPLY, @COMPANYLOGO, @USERSID)";
                        //create command with new password to update user's password
                        command = new MySqlCommand(queryString, connection);
                        command.Parameters.Add("@JOBID", MySqlDbType.VarChar, 100).Value = job.id;
                        command.Parameters.Add("@TITLE", MySqlDbType.VarChar, 100).Value = job.title;
                        command.Parameters.Add("@TYPE", MySqlDbType.VarChar, 100).Value = job.type;
                        command.Parameters.Add("@DESCRIPTION", MySqlDbType.VarChar, 100).Value = job.description;
                        command.Parameters.Add("@COMPANY", MySqlDbType.VarChar, 100).Value = job.company;
                        command.Parameters.Add("@COMPANYURL", MySqlDbType.VarChar, 100).Value = job.company_url;
                        command.Parameters.Add("@JOBURL", MySqlDbType.VarChar, 100).Value = job.url;
                        command.Parameters.Add("@LOCATION", MySqlDbType.VarChar, 100).Value = job.location;
                        command.Parameters.Add("@HOWTOAPPLY", MySqlDbType.VarChar, 100).Value = job.how_to_apply;
                        command.Parameters.Add("@COMPANYLOGO", MySqlDbType.VarChar, 100).Value = job.company_logo;
                        command.Parameters.Add("@USERSID", MySqlDbType.Int32, 100).Value = job.users_id;

                        reader = command.ExecuteReader();
                        if (reader.RecordsAffected > 0)
                        {
                            reader.Close();
                            success = 2;
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
        * Please view method description in JobDataInterface
        */
        public bool Delete(Job job)
        {
            string queryString = "DELETE * FROM user_jobs WHERE id = @ID";
            bool success = false;
            using (connection)
            {
                //create command to delete job
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@ID", MySqlDbType.Int32, 100).Value = job.id;

                try
                {
                    connection.Open();
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.RecordsAffected > 0)
                    {
                        success = true;
                        reader.Close();

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
        * Please view method description in JobDataInterface
        */
        public List<Job> ReadAll(User user)
        {
        
            string queryString = "SELECT * FROM user_jobs WHERE users_id = @USERSID";
            List<Job> jobs = new List<Job>();
            using (connection)
            {
                //create command to find user with email
                MySqlCommand command = new MySqlCommand(queryString, connection);
                command.Parameters.Add("@USERSID", MySqlDbType.Int32, 100).Value = user.Id;
               
                try
                {
                    connection.Open();
                    MySqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        jobs.Add(new Job(reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4), reader.GetString(5),
                            reader.GetString(6), reader.GetString(7), reader.GetString(8), reader.GetString(9), reader.GetString(10)));
                       
                    }
                    reader.Close();
                    connection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            return jobs;

        }
    }
}
