exports.userBasicSerializer = data => ({
  user: {
    id: data.id,
    name: data.name,
    last_name: data.last_name,
    email: data.email,
    role: data.role
  }
});

exports.listUsers = data => ({
  users: data.map(user => ({
    id: user.id,
    name: user.name,
    last_name: user.lastName,
    email: user.email,
    role: data.role
  }))
});

exports.dataJWT = data => ({
  id: data.id,
  name: data.name,
  last_name: data.lastName,
  role: data.role
});
