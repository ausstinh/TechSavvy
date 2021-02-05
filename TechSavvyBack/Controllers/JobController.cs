using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechSavvyBack.Business;
using TechSavvyBack.Models;

namespace TechSavvy.Controllers
{
    /*
     * REST API Controller for jobs
     * Sends and recieves user saved jobs from MYSQL Database
     */
    [Route("api/job")]
    [ApiController]
    public class JobController : ControllerBase
    {
        //job business service instance
        JobBusinessService BusinessService = new JobBusinessService();

         /*
         *Retrieves all the latest jobs from the GitHub Jobs API to be displayed on the search jobs js page.
         *@param none
         *returns Response object
         */
        [HttpGet("{action}")]
        public Response RetrieveJobs()
        {
            //retrieve jobs from the REST API       
            var jobs = BusinessService.RetrieveJobsAsync();

            //check if jobs are there 
            //send a response back to search jobs js page with correct status 
            if (jobs == null)
            {
                
                return new Response { Status = "invalid", Message = "invalid job JSON array" };
            }
            //send Job object array to be displayed on js page load
            return new Response { Status = "valid", Message = "jobs found.", Jobs = jobs };

        }
    }
}
