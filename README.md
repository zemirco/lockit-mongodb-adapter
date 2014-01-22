# Lockit MongoDB adapter

[![Build Status](https://travis-ci.org/zeMirco/lockit-mongodb-adapter.png)](https://travis-ci.org/zeMirco/lockit-mongodb-adapter) [![NPM version](https://badge.fury.io/js/lockit-mongodb-adapter.png)](http://badge.fury.io/js/lockit-mongodb-adapter)

[![NPM](https://nodei.co/npm/lockit-mongodb-adapter.png)](https://nodei.co/npm/lockit-mongodb-adapter/)

MongoDB adapter for [Lockit](https://github.com/zeMirco/lockit).

## Installation

`npm install lockit-mongodb-adapter`

```js
var adapter = require('lockit-mongodb-adapter');
```

## Configuration

The following settings are required.

```js
exports.db = 'mongodb://127.0.0.1/test';
exports.dbCollection = 'users';
```

## Features

### 1. Create user

`adapter.save(name, email, pass, callback)`

 - `name`: String - i.e. 'john'
 - `email`: String - i.e. 'john@email.com'
 - `pass`: String - i.e. 'password123'
 - `callback`: Function - `callback(err, user)` where `user` is the new user now in our database.

The `user` object has the following properties

 - `email`: email that was provided at the beginning
 - `hash`: hashed password using [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/)
 - `signupTimestamp`: Date object to remember when the user signed up
 - `signupToken`: unique token sent to user's email for email verification
 - `signupTokenExpires`: Date object usually 24h ahead of `signupTimestamp`
 - `username`: username chosen during sign up
 - `failedLoginAttempts`: save failed login attempts during login process, default is `0`

```js
adapter.save('john', 'john@email.com', 'secret', function(err, user) {
  if (err) console.log(err);
  console.log(user);
  // {
  //  username: 'john',
  //  email: 'john@email.com',
  //  signupToken: 'ef32a95a-d6ee-405a-8e4b-515b235f7c54',
  //  signupTimestamp: Wed Jan 15 2014 19:08:27 GMT+0100 (CET),
  //  signupTokenExpires: Wed Jan 15 2014 19:08:27 GMT+0100 (CET),
  //  failedLoginAttempts: 0,
  //  hash: '$2a$10$1IpbBVnhaNNAymV3HXO/z.632Knz27Od.oKpO1YoFnLlUjJMNcCEO',
  //  _id: 52d6ce9b651b4d825351641f
  // }
});
```

### 2. Find user

`adapter.find(match, query, callback)`

 - `match`: String - one of the following: 'username', 'email' or 'signupToken'
 - `query`: String - corresponds to `match`, i.e. 'john@email.com'
 - `callback`:  Function - `callback(err, user)`
 
```js
adapter.find('username', 'john', function(err, user) {
  if (err) console.log(err);
  console.log(user);
  // {
  //  username: 'john',
  //  email: 'john@email.com',
  //  signupToken: 'fe1a14ca-e614-4eb5-9dff-d5d947b5ba19',
  //  signupTimestamp: Wed Jan 15 2014 19:10:53 GMT+0100 (CET),
  //  signupTokenExpires: Wed Jan 15 2014 19:10:53 GMT+0100 (CET),
  //  failedLoginAttempts: 0,
  //  hash: '$2a$10$jFcGpdDKk/hqhP93VQGcce5zgoWVPGi7bQvpjupaOUKqIVBV.yI1e',
  //  _id: 52d6cf2d0ed24a865323739d
  // }
});
```

### 3. Update user

`adapter.update(user, callback)`

 - `user`: Object - must have `_id` and `_rev` properties
 - `callback`: Function - `callback(err, user)` - `user` is the updated user object
 
```js
// get a user from db first
adapter.find('username', 'john', function(err, user) {
  if (err) console.log(err);
  
  // add some new properties to our existing user
  user.newKey = 'and some value';
  user.hasBeenUpdated = true;
  
  // save updated user to db
  adapter.update(user, function(err, user) {
    if (err) console.log(err);
    // ...
  });
});
```

### 4. Remove user

`adapter.remove(match, query, callback)`

 - `match`: String - one of the following: 'username', 'email' or 'signupToken'
 - `query`: String - corresponds to `match`, i.e. `john@email.com`
 - `callback`: Function - `callback(err, res)` - `res` is `true` if everything went fine
 
```js
adapter.remove('username', 'john', function(err, res) {
  if (err) console.log(err);
  console.log(res);
  // true
});
```

## Test

`grunt`

## License

Copyright (C) 2013 [Mirco Zeiss](mailto: mirco.zeiss@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.