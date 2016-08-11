"use strict";

import * as express from 'express';
import * as mongodb from 'mongodb';

import * as bodyParser from 'body-parser'; 

import { UserRoute } from './Routes/User/UserRoute';
import { UserRepository } from './Repositories/UserRepository';

var dbInitParameters = {
    host: "localhost",
    port: 27017,
    dbName: "Hirundo"
};

var url = `mongodb://${ dbInitParameters.host }:${ dbInitParameters.port }/${ dbInitParameters.dbName }`;
var app = express();

app.use(bodyParser.json());

mongodb.MongoClient.connect(url, (err, db) => {
    var userEndPoint = new UserRoute(new UserRepository(db));
    if(err){
        console.log(`Could not connect to Mongo: \n ${err}`);
        return;
    }
    console.log('MongoDB ready');
    app.post('/security/register', (req, res) => {userEndPoint.registerUser(req, res)});
    app.post('/security/login', (req, res) => {
        userEndPoint.loginUser(req, res);
    });

    const serverPort = 3000;
    app.listen(serverPort, function(){
        console.log(`Server ready. Listening on port ${serverPort}`);
    })
});

