using Globitle.API.Models;
using Globitle.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace Globitle.API.Helper
{
    public static class Helper
    {
     
        public static string GetHtmlcontent(string password)
        {
            string Response = "<div style=\"width:100%;background-color:lightblue;text-align:center;margin:10px\">";
            Response += "<h1>Welcome to Bussnies park</h1>";
            Response += "<img src=\"https://www.tipntag.com/files/get/original/place/_5c3b3058f06630.96990108_26168748_728237967371101_234813221717426622_n.jpg\" />";
            Response += "<h2>Thanks for subscribed us</h2>";
            Response += "<a href=\"https://www.youtube.com/channel/UCsbmVmB_or8sVLLEq4XhE_A/join\">Please join membership by click the link</a>";
            Response += $"<div><h3> your password : {password}</h3></div>";
            Response += "</div>";
           
            return Response;
        }   

    }
}
