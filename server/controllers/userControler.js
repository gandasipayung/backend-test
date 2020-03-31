const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'development'
const speakeasy = require('speakeasy')
const nodemailer = require('nodemailer')
let secret = ''
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
            
            secret = speakeasy.generateSecret({length: 6})
            // nodemailer
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: ' gandasipayung20@gmail.com',//replace with your email
                pass: 'bandot69'//replace with your password
              }
            });

            const mailOptions = {
              from: 'gandasipayung20@gmail.com',//replace with your email
              to: email,//replace with your email
              subject: `Contact name: ${user.name}`,
              html:`<h1>Contact details</h1>
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
                let payload = {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
                const token = jwt.sign(payload, JWT_SECRET)
                res.status(200).json({
                  msg: 'Login Sucess, Proceed to 2FA'
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
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static verifyAuthKey (req, res, next) {
    const { authKey } = req.body
    
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