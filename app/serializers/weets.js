exports.dataBasic = data => ({
  weet: {
    id: data.id,
    content: data.content
  }
});

exports.listWeets = data => ({
  weets: data.map(weet => ({
    id: weet.id,
    content: weet.content,
    user: {
      id: weet.user.id,
      name: weet.user.name,
      last_name: weet.user.lastName
    }
  }))
});
