exports.signUp = data => ({
  user: {
    id: data.id,
    name: data.name,
    last_name: data.lastName,
    email: data.email
  }
});

exports.getUsers = data => ({
  users: data.map(user => ({
    id: user.id,
    name: user.name,
    last_name: user.lastName,
    email: user.email
  }))
});
