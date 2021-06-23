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

exports.dataJWTIn = data => ({
  id: data.id,
  name: data.name,
  lastName: data.last_name,
  role: data.role
});
