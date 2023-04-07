const { AuthController } = require('./authController');
const { CatController } = require('./catController');

module.exports = {
    AuthController: new AuthController(),
    CatController: new CatController(),
};
