const { User } = require('../models')

class UserController {
  static getUser(req, res, next) {
    User
      .findAll()
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static userLogin (req, res, next) {
    const { email,  password} = req.body
    User
      .findOne({
        where: {
          email
        }
      })
      .then(user => {
        if(user) {
          if(user.password === password) {
            res.status(200).json(user)
          } else {
            res.status(400).json('Wrong email/password')
          }
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static userRegister (req, res, next) {
    const { name, email, password} = req.body
    User
      .create({
        name,
        email,
        password
      })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

}

module.exports = UserController