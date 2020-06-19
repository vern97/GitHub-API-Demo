using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HW7.Models
{
    public class CommitInfo
    {
        public string Message { get; set; }
        public CommitAuthor Author { get; set; }
    }
}