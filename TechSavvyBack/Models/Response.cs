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
        public Job[] Jobs { get; set; }
    }
}
