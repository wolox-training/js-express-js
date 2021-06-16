exports.signUp = data => ({
  user: {
    id: data.id,
    name: data.name,
    last_name: data.lastName,
    email: data.email
  }
});
