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
        *Not used yet
        */
        JsonResult SearchJob(string searchKey);
        /*
        *Not used yet
        */
        Job[] GetAllUserJobs(int userId);
        /*
        *Not used yet
        */
        Boolean DeleteUserJob(int jobId);
        /*
        *Not used yet
        */
        Boolean SaveUserJob(Job job);
        /*
         *sends a request to get 50 of the most recent jobs from GITHUB JOBS API to
         *display on searchJobs.js page
         *@param none
         *returns List of job objects
         */
        Task<List<Job>> RetrieveJobsAsync();
    };
}
