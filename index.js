const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors= require('cors');
const Token = require("./Api/models/token");
const Resturant = require("./Api/models/resturant");

const app = express();

const typeDefs = require('./Api/typeDefs');
const resolvers = require('./Api/resolvers');

app.get("/confirmation/:email/:token", async (req,res) => {
    
    Token.findOne({ token: req.params.token }, function (err, token) {
        // token is not found into database i.e. token may have expired 
        if (!token){
            return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
        }
        // if token is found then check valid user 
        else{
            Resturant.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                // not valid user
                if (!user){
                    return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
                } 
                // user is already verified
                else if (user.verified){
                    return res.status(200).send('User has been already verified. Please Login');
                }
                // verify user
                else{
                    // change verified to true
                    user.verified = true;
                    user.save(function (err) {
                        // error occur
                        if(err){
                            return res.status(500).send({msg: err.message});
                        }
                        // account successfully verified
                        else{
                          return res.status(200).send('Your account has been successfully verified');
                        }
                    });
                }
            });
        }
        
    });
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type ,Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
});
// server.express.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:7777');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
//   });
server.applyMiddleware({app});
app.use("/images", express.static(__dirname + '/images'));


mongoose.connect(
    process.env.mongoURI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
  ).then(() => console.log("DB Connected"));
  mongoose.connection.on("error", err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
});
