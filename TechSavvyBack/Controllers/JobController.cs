using Microsoft.AspNetCore.Mvc;
using TechSavvyBack.Business;
using TechSavvyBack.Models;

namespace TechSavvy.Controllers
{
    /*
     * REST API Controller for jobs
     * Sends and recieves user saved jobs from MYSQL Database
     */
    [Route("api/[controller]")]
    public class JobController : ControllerBase
    {
        //job business service instance
        JobBusinessService JobBusinessService = new JobBusinessService();
        UserBusinessService UserBusinessService = new UserBusinessService();

         /*
         *Retrieves all the latest jobs from the GitHub Jobs API to be displayed on the search jobs js page.
         *@param none
         *returns Response object
         */
        [HttpGet("{action}")]
        public Response RetrieveJobs()
        {
            //retrieve jobs from the REST API       
            var jobs = JobBusinessService.RetrieveJobsAsync();

            //check if jobs are there 
            //send a response back to search jobs js page with correct status 
            if (jobs == null)
            {              
                return new Response { Status = "invalid", Message = "invalid job JSON array" };
            }
            //send Job object array to be displayed on js page load
            return new Response { Status = "valid", Message = "jobs found.", Jobs = jobs };
        }

        /*
        *Retrieves a list of job objects from the GitHub Jobs API using the searchKey object
        *@param {SearchKey} searchKey
        *returns Response object
        */
        [HttpPost("{action}")]
        public Response SearchJobs([FromBody] SearchKey searchKey)
        {
            //retrieve jobs from the REST API       
            var jobs = JobBusinessService.SearchJobs(searchKey);
           
            //check if jobs are there 
            //send a response back to search jobs js page with correct status 
            if (jobs == null)
            {
                return new Response { Status = "invalid", Message = "invalid job JSON array" };
            }
            searchKey.User.RecentSearches = UserBusinessService.UpdateRecentSearches(searchKey);
            //send Job object array to be displayed on js page load
            return new Response { Status = "valid", Message = "jobs found.", Jobs = jobs, User = searchKey.User };

        }
        /*
      *Saves job to the users_job table to view job on the user's profile page
      *@param {Job} job
      *returns Response object
      */
        [HttpPost("{action}")]
        public Response SaveJob([FromBody] Job job)
        {
            //retrieve jobs from the REST API       
            var success = JobBusinessService.SaveUserJob(job);

            //check if jobs are there 
            //send a response back to search jobs js page with correct status 
            if (success == 0)
            { 
                return new Response { Status = "invalid", Message = "Job was not saved" };
            }
            if (success == 1)
            {
                return new Response { Status = "invalid", Message = "Job is already saved" };
            }
            //send Job object array to be displayed on js page load
            return new Response { Status = "valid", Message = "job saved to your profile."};

        }
        /*
        *Retrieves all the latest jobs from the GitHub Jobs API to be displayed on the search jobs js page.
        *@param none
        *returns Response object
        */
        [HttpPost("{action}")]
        public Response RetrieveUserJobs([FromBody] User user)
        {
            //retrieve user jobs from the database      
            var jobs = JobBusinessService.GetAllUserJobs(user);

            //check if jobs are there 
            //send a response back to profile js page with correct status 
            if (jobs == null)
            {
                return new Response { Status = "invalid", Message = "invalid job list" };
            }
            //send Job object array to be displayed on js page load
            return new Response { Status = "valid", Message = "jobs found.", UserJobs = jobs };
        }
    }
}
