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

    public registerUser(newUser){
        return new Promise<any>((resolve, reject) => {

        })
    }
}