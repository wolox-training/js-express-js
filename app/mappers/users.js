exports.signUp = data => ({
  name: data.name,
  lastName: data.last_name,
  email: data.email,
  password: data.password
});

exports.signIn = data => ({
  email: data.email,
  password: data.password
});
