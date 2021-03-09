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
        *Not used yet
        */
        List<Job> GetAllUserJobs(User userId);
        /*
        *Not used yet
        */
        bool DeleteUserJob(Job job);
        /*
        *Not used yet
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
