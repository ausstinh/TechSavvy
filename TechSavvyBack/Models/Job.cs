using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechSavvyBack.Models
{
    public class Job
    {
        int Id { get; set; }
        string JobId { get; set; }
        string Title { get; set; }
        string Type { get; set; }
        string Description { get; set; }
        string Company { get; set; }
        string CompanyUrl { get; set; }
        string JobUrl { get; set; }
        string Location { get; set; }
        string HowToApply { get; set; }
        string  CompanyLogo { get; set; }
        int UserId { get; set; }
    }
}
