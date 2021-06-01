const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "myEmployee";

// create a client, passing in additional options
const client = new MongoClient(url, {
  poolSize: 10
});

client.connect(function(err: any) {
  if (err) throw err;

  let db = client.db("myEmployee");

  db.collection("myEmployee")
    .find()
    .toArray(function(err: any, result: any) {
      if (err) throw err;

      console.log(result);
    });
  client.close();
});

client.connect(function(err: any) {
  if (err) throw err;

  let db = client.db("myEmployee");

  db.collection("myEmployee").insertOne({ name: "jean", age: 24 }, function(
    err: any,
    result: any
  ) {
    if (err) throw err;
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
