
##### 0.2.0 - 2014-04-03

- simplify `remove()` method

  ```js
  adapter.remove(match, query, callback)
  ```

  becomes

  ```js
  adapter.remove(username, callback)
  ```

...

##### 0.1.0 - 2013-01-22

 - drop `dbUrl` and use `db` instead
 - use new `config.js` structure
