
var MongoClient = require('mongodb').MongoClient;
var uuid = require('node-uuid');
var pwd = require('couch-pwd');
var ms = require('ms');
var moment = require('moment');

module.exports = function(config) {

  // short form for collection name
  var coll = config.db.collection;

  // create connection string
  var url = config.db.url + config.db.name;

  // create connection as soon as module is required and share global db object
  var db;
  MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    db = database;
  });

  var adapter = {};

  // create a new user and return user object
  adapter.save = function(name, email, pw, done) {

    var now = moment().toDate();
    var timespan = ms(config.signup.tokenExpiration);
    var future = moment().add(timespan, 'ms').toDate();

    var user = {
      name: name,
      email: email,
      signupToken: uuid.v4(),
      signupTimestamp: now,
      signupTokenExpires: future,
      failedLoginAttempts: 0
    };

    // create salt and hash
    pwd.hash(pw, function(err, salt, hash) {
      if (err) return done(err);
      user.salt = salt;
      user.derived_key = hash;
      db.collection(coll).save(user, done);
    });

  };

  // find an existing user
  adapter.find = function(match, query, done) {

    var qry = {};
    qry[match] = query;

    db.collection(coll).find(qry).nextObject(done);

  };

  // update an existing user and return updated user object
  adapter.update = function(user, done) {

    // update user in db
    db.collection(coll).save(user, function(err, res) {
      if (err) console.log(err);

      // res is not the updated user object! -> find manually
      db.collection(coll).find({_id: user._id}).nextObject(done);

    });

  };

  // remove an existing user from db
  adapter.remove = function(name, done) {

    db.collection(coll).remove({name: name}, function(err, numberOfRemovedDocs) {
      if (err) return done(err);
      if (numberOfRemovedDocs === 0) return done(new Error('lockit - Cannot find user "' + name + '"'));
      done(null, true);
    });

  };

  return adapter;

};
