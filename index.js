
var MongoClient = require('mongodb').MongoClient;
var uuid = require('node-uuid');
var pwd = require('couch-pwd');
var ms = require('ms');
var moment = require('moment');



/**
 * Adapter constructor function.
 *
 * @param {Object} config
 * @constructor
 */
var Adapter = module.exports = function(config) {

  if (!(this instanceof Adapter)) return new Adapter(config);

  this.config = config;
  this.collection = config.db.collection;

  // create connection string
  var url = config.db.url + config.db.name;

  // create connection as soon as module is required and share global db object
  var that = this;
  MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    that.db = database;
  });

};



/**
 * Create a new user.
 *
 * @param {String} name
 * @param {String} email
 * @param {String} pw
 * @param {Function} done
 */
Adapter.prototype.save = function(name, email, pw, done) {
  var that = this;

  var now = moment().toDate();
  var timespan = ms(that.config.signup.tokenExpiration);
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
    that.db.collection(that.collection).save(user, done);
  });
};



/**
 * Find user. Match is either `name`, `email` or `signupToken`.
 *
 * @param {String} match
 * @param {String} query
 * @param {Function} done
 */
Adapter.prototype.find = function(match, query, done) {
  var qry = {};
  qry[match] = query;
  this.db.collection(this.collection).find(qry).nextObject(done);
};



/**
 * Update existing user.
 *
 * @param {Object} user
 * @param {Function} done
 */
Adapter.prototype.update = function(user, done) {
  var that = this;
  // update user in db
  that.db.collection(that.collection).save(user, function(err, res) {
    if (err) console.log(err);
    // res is not the updated user object! -> find manually
    that.db.collection(that.collection).find({_id: user._id}).nextObject(done);
  });
};



/**
 * Delete existing user.
 *
 * @param {String} name
 * @param {Function} done
 */
Adapter.prototype.remove = function(name, done) {
  this.db.collection(this.collection).remove({name: name}, function(err, numberOfRemovedDocs) {
    if (err) return done(err);
    if (numberOfRemovedDocs === 0) return done(new Error('lockit - Cannot find user "' + name + '"'));
    done(null, true);
  });
};
