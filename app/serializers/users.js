exports.signUp = data => ({
  user: {
    id: data.id,
    name: data.name,
    last_name: data.lastName,
    email: data.email
  }
});

exports.dataComplete = data => ({
  user: {
    id: data.id,
    name: data.name,
    last_name: data.lastName,
    email: data.email,
    password: data.password
  }
});

exports.dataJWT = data => ({
  id: data.id,
  name: data.name,
  last_name: data.lastName
});
