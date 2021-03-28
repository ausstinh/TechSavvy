using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechSavvyBack.Models;

namespace TechSavvyBack.Business
{
    public interface JobBusinessInterface
    {
        /*
        *Retrieves 50 jobs using the search key parameter 
        *display on searchJobs.js page
        *@param {SearchKey} searchKey
        *returns List of job objects
        */
        Task<List<Job>> SearchJobs(SearchKey searchKey);
        /*
        *Retrieves all user's jobs from the database to display in the user's profile
        *@param {int} userId
        *returns list of Jobs
        */
        List<Job> GetAllUserJobs(User userId);
        /*
       *delete job from the user_jobs table using job object
       *@param {Job} job
       *returns boolean
       */
        bool DeleteUserJob(Job job);
        /*
        *Saves job object to the user_jobs table to view in user's profile
        *@param {Job} job
        *returns int
        */
        int SaveUserJob(Job job);
        /*
         *sends a request to get 50 of the most recent jobs from GITHUB JOBS API to
         *display on searchJobs.js page
         *@param none
         *returns List of job objects
         */
        Task<List<Job>> RetrieveJobsAsync();
    };
}
