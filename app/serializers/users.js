exports.dataBasic = data => ({
  user: {
    id: data.id,
    name: data.name,
    last_name: data.last_name,
    email: data.email,
    role: data.role
  }
});

exports.dataComplete = data => ({
  user: {
    id: data.id,
    name: data.name,
    last_name: data.lastName,
    email: data.email,
    password: data.password,
    role: data.role
  }
});

exports.dataJWT = data => ({
  id: data.id,
  name: data.name,
  last_name: data.last_name,
  role: data.role
});
