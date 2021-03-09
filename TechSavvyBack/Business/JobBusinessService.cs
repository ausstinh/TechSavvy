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
using TechSavvyBack.Data;

namespace TechSavvyBack.Business
{
    public class JobBusinessService : JobBusinessInterface
    {
        //GITHUB JOBS API URL to send Rest API request to
        private const string URL = "https://jobs.github.com/positions.json";
        JobDataService Jobservice = new JobDataService();
        UserDataService Userservice = new UserDataService();

        /*
        * Please view method description in JobBusinessInterface
        */
        public bool DeleteUserJob(Job job)
        {
            return Jobservice.Delete(job);
        }
        /*
        * Please view method description in JobBusinessInterface
        */
        public List<Job> GetAllUserJobs(User user)
        {
            return Jobservice.ReadAll(user);
        }
        /*
        * Please view method description in JobBusinessInterface
        */
        public int SaveUserJob(Job job)
        {
         return Jobservice.Create(job);
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
                Job tempJob = new Job(job.id, job.title, job.type, job.description, job.company, job.company_url, job.url, job.location, job.how_to_apply, job.company_logo, job.created_at);
                jobList.Add(tempJob);
            }


            return jobList;
        }
        /*
        * Please view method description in JobBusinessInterface
        */
        public async Task<List<Job>> SearchJobs(SearchKey searchKey)
        {
            HttpClient client = new HttpClient();
            List<Job> jobList = new List<Job>();

            string response = await client.GetStringAsync(URL + "?description=" + searchKey.Key);

            var data = JsonConvert.DeserializeObject<Job[]>(response);
            if (data != null)
            {
                foreach (var job in data)
                {
                    Job tempJob = new Job(job.id, job.title, job.type, job.description, job.company, job.company_url, job.url, job.location, job.how_to_apply, job.company_logo, job.created_at);
                    jobList.Add(tempJob);
                }
            }

            return jobList;
        }
    }
}
