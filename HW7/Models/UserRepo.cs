using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HW7.Models
{
    public class UserRepo
    {
        public string Name { get; set; }
        public string Full_Name { get; set; }
        public RepoOwner Owner { get; set; }
        public string Updated_At { get; set; }
        public string Html_Url { get; set; }
    }
}