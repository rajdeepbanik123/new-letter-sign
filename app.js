 const express=require("express");
 const bodyparser=require("body-parser");
 const request=require("request");
 const https=require("https");
 const dotenv = require("dotenv");
require('dotenv').config();




 const app=express();
 app.use(express.static("public"));
 app.use(bodyparser.urlencoded({extended:true})); 

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
     const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
     };
     const jsondata=JSON.stringify(data);
   
   


const listId = process.env.LIST_ID;
const apiKey = process.env.API_KEY;
const user = process.env.USER;
const auth = user + ":" + apiKey;
const usServer = process.env.US_SERVER;
const url = 'https://' + usServer + '.api.mailchimp.com/3.0/lists/' + listId;

const options = {
  method: "POST",
  auth: auth
}



const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    };

    response.on('data', function(data){
      console.log(JSON.parse(data));
      console.log(response.statusCode);
    })
  });

  request.write(jsondata);
  request.end();

}); 



 app.post("/failure",function(req,res){
  res.redirect("/");
 });


 app.listen(process.env.PORT||3000,function(){

  console.log("server is running");

 });







