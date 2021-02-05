using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechSavvyBack.Models
{
    public class Response
    {
        public string Status { set; get; }
        public string Message { set; get; }
        public User User { get; set; }
        public User[] Users { get; set; }
        public Task<List<Job>> Jobs { get; set; }
        public string[] Data { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
