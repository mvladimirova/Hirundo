"use strict";

import * as express from 'express';
import * as mongodb from 'mongodb';

import * as bodyParser from 'body-parser'; 

var dbInitParameters = {
    host: "localhost",
    port: 27017,
    dbName: "Hirundo"
};

var url = `mongodb://${ dbInitParameters.host }:${ dbInitParameters.port }/${ dbInitParameters.dbName }`;
var app = express();
app.use(bodyParser.json());

mongodb.MongoClient.connect(url, (err, db) => {
    if(err){
        console.log(`Could not connect to Mongo: \n ${err}`);
        return;
    }
    console.log('MongoDB ready');
    let securityRouter = express.Router();
    // securityRouter.route('/security/register')
    //     .post((req, res) => { userEndPoint.register(req, res)});
    // securityRouter.route('/security/login')
    //     .post((req, res) => { userEndPoint.login(req, res)}); 

    const serverPort = 3000;
    app.listen(serverPort, function(){
        console.log(`Server ready. Listening on port ${serverPort}`);
    })
});

