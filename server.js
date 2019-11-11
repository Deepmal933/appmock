const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyparser = require('body-parser')
const app = express();
const fs = require('fs');
var multipart = require('connect-multiparty');
var multipartmiddleware = multipart();
const request = require('request');
const jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
const axios = require('axios');

app.use(express.static(__dirname + '/dist/frontapp'));


//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://deepmal933:9333deeP@ds229474.mlab.com:29474/heroku_ck5qfsp5';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('open');
});

var Schema = mongoose.Schema;

var UserModel = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  email: String,
  password: String,
  token:String,
  loginType:String,
  userId:Number,
  name:String,
  avatar:String,
  membership:String
} ,{collection: 'Users'});

var Users = mongoose.model('Users', UserModel );

app.use(cors());
app.use(bodyparser.json());


app.get('/api/dribbble',(req,res)=>{
    var callbackURL = 'https://appmock.herokuapp.com/api/dribbble/callback'
    var cliendId = '341a75fea894f83b8c50444d94524ea1b4cd9c323ff9187aec4e3123b241f4c2'

res.redirect('https://dribbble.com/oauth/authorize?client_id='+cliendId+'&scope=public+upload&redirect_uri='+callbackURL)

});

app.get('/api/dribbble/callback',(req,res)=>{
   if(req.query.code){
    axios.post('https://dribbble.com/oauth/token', {
        client_id: '341a75fea894f83b8c50444d94524ea1b4cd9c323ff9187aec4e3123b241f4c2',
        client_secret: '9b291c71a40b8741a3daf28470d236496460a3e6f9745e26666a83c717e0c006',
        code:req.query.code,
      })
      .then(function (ress) {
          console.log(ress.data.access_token);
        axios.get('https://api.dribbble.com/v2/user?access_token='+ress.data.access_token)
        .then(response => {
            var options = { upsert: true, new: true, setDefaultsOnInsert: true };
            Users.findOneAndUpdate({userId:response.data.id},{ token: ress.data.access_token,loginType:'dribbble',userId:response.data.id,name:response.data.name,membership:'Free',avatar:response.data.avatar_url},options, function (err, data) {
                if (err){
                    res.status(500).send("error");
                }
                console.log("ddd:"+data)
                var token = jwt.sign({userID: data.id}, 'deepmal933', {expiresIn: '2h'});
                res.redirect(307,'https://appmock.herokuapp.com/login?token='+token);       // saved!
              });
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(function (error){
        console.log(error);
      });
    }
    });
  




app.post('/api/signup',function(req,res){
    var hashedPassword = passwordHash.generate(req.body.password);

    Users.create({ email: req.body.email , password: hashedPassword,loginType:'email',userId:0}, function (err, data) {
        if (err){
            res.status(500).send("error");
        }
        res.send({data});        // saved!
      });

  

});







app.post('/api/auth', function(req, res) {
    const body = req.body;

    console.log(body.username);
    Users.find({ email: body.username}, function (err, docs) {
        if(err){
            res.status(500).json({
                error: err
             });
                   
            }
        if (docs.length>0) {
            var pass = passwordHash.verify(body.password, docs[0].password);
        if(pass){
            console.log(docs);
            console.log(docs[0].id);
            var token = jwt.sign({userID: docs[0].id}, 'deepmal933', {expiresIn: '2s'});
            console.log(token);
            res.send({token});
        }
        else{
            res.status(500).json({
                error: "error"
            });  
        }

        }
        else{
            res.status(500).json({
                error: "error"
             });
        }
       
        
    });

  
    
    
   
  });

  app.post('/api/user', function(req,res){
      console.log("token"+req.body.token);
      getUser(req.body.token,res);

  });


// Serve only the static files form the dist directory



app.post('/publish',multipartmiddleware,(req,res)=>{
    var jwt = req.body.jwt;
    var shot = req.files.image;
    var title = req.body.title;
    var des = req.body.des;
    var tags =req.body.tags.slice(1,-1);
    console.log(tags[0]);
    publishShot(jwt,res,shot,title,des,tags);
})



 
    
   
    
app.get('*', function(req,res) {
    
        res.sendFile(path.join(__dirname+'/dist/frontapp/index.html'));
});
    

function getUser(jwtString,res)
{

    jwt.verify(jwtString,"deepmal933",function(err,decoded){
        if(err){
            console.log("decodeerror");
            return res.status(500).send("error");
        }
        console.log("decoded:"+decoded)
        Users.findOne({_id:decoded.userID},(err,docs)=>{
            if(err){
                res.status(500).send("error");
            }
            var data = docs;
            res.send({data});
        })

    });
  
}

function publishShot(jwtString,res,image,title,des,tags){

    jwt.verify(jwtString,"deepmal933",function(err,decoded){
        if(err){
            console.log("decodeerror");
            return res.status(500).send("error");
        }
        console.log("decoded:"+decoded)
        Users.findOne({_id:decoded.userID},(err,docs)=>{
            if(err){
                res.status(500).send("error");
            }
            var data = docs;


            var url = "https://api.dribbble.com/v2/shots?access_token="+data.token;
            console.log(image);
            var buff = new Buffer(image.path);
            buff.toString('utf8');
            
                var data = {
                    title: title,
                    description:des,
                    tags:tags,
                    low_profile:'true',
                    image: {
                        value:  fs.createReadStream(image.path),
                        options: {
                          filename: 'shot.png',
                          contentType: 'image/png'
                        }
                }};	
                request({
                    url: url,
                    method: "POST",
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    json: true,	
                    formData: data
                },function (error, response, body) {
                    if (error) {
                      return res.status(500).send(error);
                    }
                    res.send(body);
                  });
                
                
                
                })

    });

   

   

      
}
 
    

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);