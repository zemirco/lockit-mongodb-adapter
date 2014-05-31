
### save(name, email, pw, done)

Create new user.


- `name` **String** - User name

- `email` **String** - User email

- `pw` **String** - Plain text user password

- `done` **function** - Callback function <code>function(err, user){}</code>





#### Example


```javascript
adapter.save('john', 'john@email.com', 'secret', function(err, user) {
  if (err) console.log(err);
  console.log(user);
  // {
  //  name: 'john',
  //  email: 'john@email.com',
  //  signupToken: 'ef32a95a-d6ee-405a-8e4b-515b235f7c54',
  //  signupTimestamp: Wed Jan 15 2014 19:08:27 GMT+0100 (CET),
  //  signupTokenExpires: Wed Jan 15 2014 19:08:27 GMT+0100 (CET),
  //  failedLoginAttempts: 0,
  //  salt: '48cf9da376703199c30ba5c274580c98',
  //  derived_key: '502967e5a6e55091f4c2c80e7989623f051070fd',
  //  _id: 52d6ce9b651b4d825351641f
  // }
});
```


