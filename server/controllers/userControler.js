const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'development'
const speakeasy = require('speakeasy')
const nodemailer = require('nodemailer')
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
    const { email,  password } = req.body
    User
      .findOne({
        where: {
          email
        }
      })
      .then(user => {
        if(user) {
          const isValid = bcrypt.compareSync(password, user.password)
          if(isValid){
            
            const secret = speakeasy.generateSecret({length: 6})
            // nodemailer
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'testbackendserver@gmail.com',
                pass: 'testonly123'
              }
            });

            const mailOptions = {
              from: 'gandasipayung20@gmail.com',
              to: email,
              subject: `Hello ${user.name} ! Input this code to continue`,
              html:`
              <h2> Hello ${user.name} !</h2><br>
              <h2> Please input this key to continue </h2><br>
              <h2> Validation Key: ${secret.base32} </h2><br>`
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                res.status(400).json({
                  msg: "Can't send email, please check your email address"
                })
              }
              else {
                console.log('Email sent: ' + info.response);
                return User.update({
                  tempAuthKey: secret.base32
                }, {
                  where : {
                    email: user.email
                  }
                })
              }
            });
          } else {
            res.status(400).json({
              msg: 'Email/Password Wrong !'
            })
          }
        } else {
          res.status(400).json({
            msg: 'Email/Password Wrong !'
          })
        }
      })
      .then(() => {
        res.status(200).json({
          msg: `We have sent an email to ${email}, please check the code`
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static verifyAuthKey (req, res, next) {
    const { authKey, email } = req.body
    User
      .findOne({ where: { email }})
      .then(({ dataValues }) => {
        console.log(dataValues)
        console.log(authKey)
        if(dataValues.tempAuthKey === authKey) {
          let payload = {
            id: dataValues.id,
            name: dataValues.name,
            email: dataValues.email
          }
          console.log(payload)
          const token = jwt.sign(payload, JWT_SECRET)
          res.status(200).json({
            msg: 'Login Success',
            token
          })
        } else {
          res.status(400).json({
            msg : 'login failed'
          })
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
        let payload = {
          msg: 'User Register Success',
          name : user.name,
          email: user.email
        }
        res.status(201).json(payload)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

}

module.exports = UserController