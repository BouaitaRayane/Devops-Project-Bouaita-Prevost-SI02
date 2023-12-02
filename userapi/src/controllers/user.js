const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    };
    db.hgetall(user.username, function(err, res) {
      if (err)
        return callback(err, null)
      if (!res) {
        // Save to DB
        db.hmset(user.username, userObj, (err, res) => {
          if (err)
            return callback(err, null)
          callback(null, res) // Return callback
        })
      } else {
        callback(new Error("User already exists"), null)
      }
    })
  },
  get: (username, callback) => {
    if(!username)
      return callback(new Error("Check the username"), null)
    db.hgetall(username, function(err, res) {
      if (err) return callback(err, null)
      if(res)
        callback(null, res)
      else
        callback(new Error("User does not exist"), null)
    })
  },
  update: (username, user, callback) => {
    if(!username)
      return callback(new Error("Check the username"), null)
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    };
    db.hgetall(username, function(err, res) {
      if (err)
        return callback(err, null)
      if (res) {
        db.hmset(username, userObj, (err, res) => {
          if (err)
            return callback(err, null)
          callback(null, res)
        })
      } else {
        callback(new Error("User does not exist"), null)
      }
    })
  },
  delete: (username, callback) => {
    if(!username)
      return callback(new Error("Check the username"), null)
    db.hgetall(username, function(err, res) {
      if (err)
        return callback(err, null)
      if (res) {
        db.del(username, (err, res) => {
          if (err)
            return callback(err, null)
          callback(null, res)
        })
      } else {
        callback(new Error("User does not exist"), null)
      }
    })
  }
}


