using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechSavvyBack.Models;

namespace TechSavvyBack.Data
{
    public interface JobDataInterface
    {
        /*
        *Retrieves all user's jobs from the database to display in the user's profile
        *@param {int} userId
        *returns list of Jobs
        */
        List<Job> ReadAll(User user);
        /*
        *delete job from the user_jobs table using job object
        *@param {Job} job
        *returns boolean
        */
        bool Delete(Job job);
        /*
        *Saves job object to the user_jobs table to view in user's profile
        *@param {Job} job
        *returns int
        */
        int Create(Job job);
    }
}
