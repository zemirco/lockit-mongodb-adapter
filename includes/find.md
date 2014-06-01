
### find(match, query, done)

Find user. Match is either `'name'`, `'email'` or `'signupToken'`.


- `match` **String** - Property to find user by. <code>'name'</code>, <code>'email'</code> or <code>'signupToken'</code>

- `query` **String** - Corresponding value to <code>match</code>

- `done` **function** - Callback function <code>function(err, user){}</code>





#### Example


```javascript
adapter.find('name', 'john', function(err, user) {
  if (err) console.log(err);
  console.log(user);
  // {
  //   name: 'john',
  //   email: 'john@email.com',
  //   signupToken: '3a7f0f54-32f0-44f7-97c6-f1470b94c170',
  //   signupTimestamp: Fri Apr 11 2014 21:31:54 GMT+0200 (CEST),
  //   signupTokenExpires: Sat Apr 12 2014 21:31:54 GMT+0200 (CEST),
  //   failedLoginAttempts: 0,
  //   salt: '753981e8d8e30e8047cf5685d1f0a0d4',
  //   derived_key: '18ce03eddab6729aeaaf76729c90cb31f16a863c',
  //   _id: 5348432a98a8a6a4fef1f595
  // }
});
```


