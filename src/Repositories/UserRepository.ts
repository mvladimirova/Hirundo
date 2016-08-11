"use strict";

import * as MongoDB from 'mongodb';

export class UserRepository {
    private collection: MongoDB.Collection;

    constructor(db: MongoDB.Db){
        this.collection = db.collection(this.getCollectionName());
    };

    public getCollectionName(): string {
        return "users";
    };

    public registerUser(requestBody){
        var newUser = {
            userName: requestBody.userName,
            password: requestBody.password,
            email: requestBody.email,
            registerDate: requestBody.registerDate
        }
        
        return new Promise<any>((resolve, reject) => {
            this.collection.insertOne(newUser, (err) => {
                if(err){
                    reject(err);
                }
                resolve(true);
            })
        })
    };

    public loginUser(requestBody){
        return new Promise<any>((resolve, reject) => {
            this.collection.findOne({ userName: requestBody.userName }, {fields:{userName: 1, email: 1}}, (err, user) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                console.log(user);
                resolve(user);
            })
        })
    }
}