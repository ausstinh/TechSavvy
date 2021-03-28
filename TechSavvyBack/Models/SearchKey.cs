﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TechSavvyBack.Models
{
    public class SearchKey
    {
        public string Key { get; set; }
        public User User { get; set; }

        public bool DeleteRecentSearches { get; set; }
    }
}
