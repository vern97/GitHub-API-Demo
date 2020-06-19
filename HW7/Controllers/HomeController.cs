using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;
using System.Web.Mvc;
using System.Net;
using System.IO;
using Newtonsoft.Json;
using System.Xml.Serialization;
using System.Data;
using HW7.Models;

namespace HW7.Controllers
{
    public class HomeController : Controller
    {
        string apiKey = ;
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult User()
        {
            string user = "vern97";
            Debug.WriteLine(user);

            string uri = "https://api.github.com/users/" + user ;
            Debug.Write(uri);

            string data = SendRequest(uri, apiKey);
            UserData userdata = JsonConvert.DeserializeObject<UserData>(data);

            return Json(userdata, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Repositories()
        {
            string uri = "https://api.github.com/user/repos?sort=updated";
            Debug.WriteLine(uri);

            string data = SendRequest(uri, apiKey);
            IList<UserRepo> dictionary = JsonConvert.DeserializeObject<IList<UserRepo>>(data);

            return Json(dictionary, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Commits()
        {
            string user = Request.QueryString["user"];
            string repo = Request.QueryString["repo"];
            string uri = "https://api.github.com/repos/" + user + "/" + repo + "/commits";
            Debug.WriteLine(uri);

            string data = SendRequest(uri, apiKey);
            IList<UserCommits> dictionary = JsonConvert.DeserializeObject<IList<UserCommits>>(data);

            return Json(dictionary, JsonRequestBehavior.AllowGet);
        }


        private string SendRequest(string uri, string credentials, string username = "vern97")
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            request.Headers.Add("Authorization", "token " + credentials);
            request.UserAgent = username;       // Required, see: https://developer.github.com/v3/#user-agent-required
            request.Accept = "application/json";

            string jsonString = null;
            // TODO: You should handle exceptions here
            using (WebResponse response = request.GetResponse())
            {
                Stream stream = response.GetResponseStream();
                StreamReader reader = new StreamReader(stream);
                jsonString = reader.ReadToEnd();
                reader.Close();
                stream.Close();
            }
            return jsonString;
        }
    }
}