const bcrypt = require("bcrypt");
const db = require("../database/db");
const controllerUtils = require("../utils/controllerUtils")
const User = db.models.user;

const { BaseController } = require('./baseController');

class AuthController extends BaseController {
  constructor() {
      super();
  }

  retrieve = async (req, res) => {
    try {
      const { session } = req;
      const { username, password } = req.body

      controllerUtils.authValidator(username, password)

      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        const error = new Error('User not found!');
        error.status = 403;
        throw error;
      }

      const validatePassword = await bcrypt.compare(password, user.password)
      
      if (!validatePassword) {
        const error = new Error('Username or password is not correct!');
        error.status = 403;
        throw error;
      }

      session.sid = session.id;
      session.userId = user.id;

      return res.status(200).send({ data: user })

    } catch (error) {
      return controllerUtils.errorUtil(error, error.status, res, req)
    }
  }

  create = async (req, res) => {
    try {
      const { username, password } = req.body
      controllerUtils.authValidator(username, password)

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const [user] = await User.findOrCreate({
        where: { username },
        defaults: {
          password: hashedPassword
        }
      }).then((res) => {
        return res.status(201).json({ data: user })
      }).catch((error) => {
        controllerUtils.errorUtil(error, error.status, res, req)
      });

    } catch (error) {
      return controllerUtils.errorUtil(error, error.status, res, req)
    }
  }

  logout = async (req, res) => {
    try {
      const { session } = req
      await session.destroy(session.id);
      
      return res.json({ message: "You have succcessfully logged out." });
    } catch (error) {
      return controllerUtils.errorUtil(error, error.status, res, req)
    }
  }
}

module.exports = {
    AuthController
};
