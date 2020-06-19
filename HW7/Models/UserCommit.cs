using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HW7.Models
{
    public class UserCommits
    {
        public string Sha { get; set; }
        public string Html_Url { get; set; }
        public CommitInfo Commit { get; set; }
    }
}