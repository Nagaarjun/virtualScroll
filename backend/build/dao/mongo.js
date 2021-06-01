"use strict";
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// Connection URL
var url = "mongodb://localhost:27017";
// Database Name
var dbName = "myEmployee";
// create a client, passing in additional options
var client = new MongoClient(url, {
    poolSize: 10
});
client.connect(function (err) {
    if (err)
        throw err;
    var db = client.db("myEmployee");
    db.collection("myEmployee")
        .find()
        .toArray(function (err, result) {
        if (err)
            throw err;
        console.log(result);
    });
    client.close();
});
client.connect(function (err) {
    if (err)
        throw err;
    var db = client.db("myEmployee");
    db.collection("myEmployee").insertOne({ name: "jean", age: 24 }, function (err, result) {
        if (err)
            throw err;
        console.log("Inserted" + result);
    });
    client.close();
});
// // Use connect method to connect to the server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");
//   client.close();
// });
