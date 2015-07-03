
##### 0.4.3 / 2015-07-03

- use eslint
- update dependencies
- use make instead grunt

##### 0.4.2 / 2014-07-31

- use `findOne()` instead `find().nextObject()`

##### 0.4.1 / 2014-05-22

- code refactoring
- update dependencies

##### 0.4.0 / 2014-04-17

- database config has to be an Object and the database name isn't part of the
  connection string anymore

  **old**

  ```js
  exports.db = 'mongodb://127.0.0.1/test';
  exports.dbCollection = 'users';
  ```

  **new**

  ```js
  exports.db = {
    url: 'mongodb://127.0.0.1/',
    name: 'test',
    collection: 'users'
  };
  ```

##### 0.3.0 / 2014-04-11

- key `username` is now `name`
- use built-in [pbkdf2](http://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_callback)
  instead [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/)

##### 0.2.0 / 2014-04-03

- simplify `remove()` method

  ```js
  adapter.remove(match, query, callback)
  ```

  becomes

  ```js
  adapter.remove(username, callback)
  ```

...

##### 0.1.0 / 2013-01-22

 - drop `dbUrl` and use `db` instead
 - use new `config.js` structure
