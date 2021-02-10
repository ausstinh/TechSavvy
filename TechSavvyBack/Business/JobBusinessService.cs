using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TechSavvyBack.Models;
using System.Security.Cryptography.Xml;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TechSavvyBack.Business
{
    public class JobBusinessService : JobBusinessInterface
    {
        //GITHUB JOBS API URL to send Rest API request to
        private const string URL = "https://jobs.github.com/positions.json";

        /*
        * Please view method description in JobBusinessInterface
        */
        public bool DeleteUserJob(int jobId)
        {
            throw new NotImplementedException();
        }
        /*
        * Please view method description in JobBusinessInterface
        */
        public Job[] GetAllUserJobs(int userId)
        {
            throw new NotImplementedException();
        }
        /*
        * Please view method description in JobBusinessInterface
        */
        public bool SaveUserJob(Job job)
        {
            throw new NotImplementedException();
        }
        /*
         * Please view method description in JobBusinessInterface
         */
        public async Task<List<Job>> RetrieveJobsAsync()
        {
            HttpClient client = new HttpClient();
            List<Job> jobList = new List<Job>();
           
            string response = await client.GetStringAsync(URL);

            var data = JsonConvert.DeserializeObject<Job[]>(response);
            
            foreach (var job in data)
            {
                Job tempJob = new Job(job.id, job.title, job.type, job.description, job.company, job.company_url, job.url, job.location, job.HowToApply, job.CompanyLogo, job.created_at);
                jobList.Add(tempJob);
            }


            return jobList;
        }
        /*
        * Please view method description in JobBusinessInterface
        */
        public JsonResult SearchJob(string searchKey)
        {
            throw new NotImplementedException();
        }
    }
}
