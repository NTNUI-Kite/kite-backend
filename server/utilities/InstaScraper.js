var request = require("request");
var cheerio = require("cheerio");

var getInstaFeed= new Promise((resolve,reject) =>{
  var url = "https://www.instagram.com/explore/tags/ntnuikite/";

  request(url,function(error,response,html){
    if(!error){
      html = html.split("window._sharedData = ")[1];
      html = html.split(";</script>")[0];
      resolve(JSON.parse(html));
    }
  });
});


module.exports = getInstaFeed;
