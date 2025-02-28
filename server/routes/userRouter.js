const router = require('express').Router()
const userController = require('../controllers/userControler')

router.get('/', userController.getUser)
router.post('/login', userController.userLogin)
router.post('/auth', userController.verifyAuthKey)
router.post('/register', userController.userRegister)

module.exports = router