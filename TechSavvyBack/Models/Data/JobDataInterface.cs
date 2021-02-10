using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TechSavvyBack.Models;

namespace TechSavvyBack.Data
{
    public interface JobDataInterface
    {
        /*
        *Not used yet
        */
        Job[] ReadAll(int userId);
        /*
        *Not used yet
        */
        Boolean Delete(int jobId);
        /*
        *Not used yet
        */
        Boolean Create(Job job);
    }
}
