using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechSavvyBack.Models
{
    public class Job
    {
        public Job()
        {
        }

        public Job(string id, string title, string type, string description, string company, string company_url, string url, string location, string howToApply, string companyLogo, string created_at)
        {
            this.id = id;
            this.title = title;
            this.type = type;
            this.description = description;
            this.company = company;
            this.company_url = company_url;
            this.url = url;
            this.location = location;
            HowToApply = howToApply;
            CompanyLogo = companyLogo;
            this.created_at = created_at;
        }

        public string id { get; set; }
        public string title { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public string company { get; set; }
        public string company_url { get; set; }
        public string url { get; set; }
        public string location { get; set; }
        public string HowToApply { get; set; }
        public string CompanyLogo { get; set; }
        public string created_at { get; set; }
      
    }
}
