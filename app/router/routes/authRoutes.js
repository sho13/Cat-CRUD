const router = require("express").Router();

const { AuthController } = require('../../controllers');

router.post('/register', AuthController.create)
router.post('/login', AuthController.retrieve)
router.post('/logout', AuthController.logout)

module.exports = router;
