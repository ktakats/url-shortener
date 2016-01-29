'use strict';

var express=require("express");
var valid=require("validator")
var mongo=require("mongodb").MongoClient;
var url='mongodb://localhost:27017/mydb';
var app=express();
var check=null;


app.get('/(:myurl)?', function(req, res){
   var myurl=req.params.myurl;
   //console.log(req.get('host'))
   //check if its the main page 
   if(myurl==undefined){res.sendFile(process.cwd() + '/index.html');}
   //if not
   else{
       //check if myurl is valid url
       if(myurl!="favicon.ico" && valid.isURL(myurl)){
        //connect mongo
       mongo.connect(url, function(err,db){
          if(err){throw err;}
          var coll=db.collection("urls");
          //find out if the url has been added before
         coll.findOne({original: myurl}, function(err, result){
             if(err){throw err}
             //if not, add to mongo database
             if(result===null){
                 coll.find().count().then(function(count){
                    return count;
                    }).then(function(n){
                        n++;
                        coll.insert({original: myurl, shortened: req.protocol + '://' +req.get('host')+'/'+n},function(err,data){
                        if(err){throw err}
                        res.send(JSON.stringify(data["ops"][0], ["original", "shortened"]));
                        });
                    });
                 
                 
             }
             //if it has been added before, return json data
             else{
                 
                 res.send(JSON.stringify(result, ["original", "shortened"]));
             }
         });
                 
       });
             
        }
        //if the url is not valid, check if it's a shortened one
        else if(myurl!="favicon.ico"){
            mongo.connect(url, function(err,db){
                if(err){throw err}
                var coll=db.collection("urls");
                var isShort= req.protocol + '://' +req.get('host')+'/'+myurl;
                coll.findOne({shortened: isShort}, function(err, result){
                    if(err){throw err}
                    if(result===null){res.end("This entry does not exist")}
                    //redirect if it's a shortened url in the database
                    else{
                        var path="https://" +result["original"];
                        res.redirect(path);
                        
                        
                    }
                });
            });
        }
   }
         
    });

var port=process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Node.js listening on port ...' + port + '...');
})