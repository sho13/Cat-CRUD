// Modules //
const fs = require("fs");
const path = require("path");
const controllerUtils = require("../utils/controllerUtils")
const db = require("../database/db");
const Cat = db.models.cat;


const { BaseController } = require('./baseController');

class CatController extends BaseController {
  constructor() {
      super();
  }

  /**
   * Retrieve all cats from the database.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise} Promise representing the response.
   */
  retrieveAll = async (req, res) => {
    try {
      const sessionError = controllerUtils.sessionValidator(req.session);

      if (sessionError) {
        return controllerUtils.errorUtil(sessionError, sessionError.status, res, req);
      }

      const cats = await Cat.findAll();
      return res.status(200).json(cats);
    } catch (error) {
      return controllerUtils.errorUtil(error, error.status, res, req)
    }
  }

  /**
   * Retrieve a specific cat from the database by its ID.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise} Promise representing the response.
   */

  retrieveOne = async (req, res) => {
    try {
      const sessionError = controllerUtils.sessionValidator(req.session);

      if (sessionError) {
        return controllerUtils.errorUtil(sessionError, sessionError.status, res, req);
      }
      const { id } = req.params;

      const cat = await Cat.findOne({ where: { id } });

      const recordError = controllerUtils.hasRecords(cat);
      if (recordError) {
        return controllerUtils.errorUtil(recordError, recordError.status, res, req);
      }

      return res.status(200).sendFile(path.resolve(cat.media));
    } catch (error) {
      return controllerUtils.errorUtil(error, error.status, res, req)
    }

  }

  /**
   * Create a new cat record in the database.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise} Promise representing the response.
   */
  create = async (req, res) => {
    try {
      const sessionError = controllerUtils.sessionValidator(req.session);

      if (sessionError) {
        return controllerUtils.errorUtil(sessionError, sessionError.status, res, req);
      }

      const { file } = req;

      const fileError = controllerUtils.reqHasFile(file);

      if (fileError) {
        return controllerUtils.errorUtil(fileError, fileError.status, res, req);
      }
      
      const { name } = req.body;

      const cat = await Cat.create({
        name,
        media: file.path,
        userId: req.session.userId,
      });

      return res.status(200).sendFile(path.resolve(cat.media));
    } catch (error) {
      return controllerUtils.errorUtil(error, error.status, res, req);
    }
  }

  /**
   * Update a specific cat record in the database by its ID.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise} Promise representing the response.
   */
  update = async (req, res) => {
    try {
      const sessionError = controllerUtils.sessionValidator(req.session);

      if (sessionError) {
        return controllerUtils.errorUtil(sessionError, sessionError.status, res, req);
      }
      
      const { file } = req;

      const fileError = controllerUtils.reqHasFile(file);

      if (fileError) {
        return controllerUtils.errorUtil(fileError, fileError.status, res, req);
      }

      const { payload } = req.body;
      const { id } = req.params;

      let cat = await Cat.findOne({ where: { id } });

      const recordError = controllerUtils.hasRecords(cat)
      if (recordError) {
        return controllerUtils.errorUtil(recordError, recordError.status, res, req);
      }

      cat = await cat.update({ media: file.path, ...payload });
      
      return res.status(200).json({ name: cat.name, media: cat.media });

    } catch (error) {
      return controllerUtils.errorUtil(error, error.status, res, req);
    }
  }

  /**
   * Delete a specific cat record in the database by its ID.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise} Promise representing the response.
   */
  delete = async (req, res) => {
    try {
      const sessionError = controllerUtils.sessionValidator(req.session);

      if (sessionError) {
        return controllerUtils.errorUtil(sessionError, sessionError.status, res, req);
      }
      
      const { id } = req.params;
      const cat = await Cat.findOne({ where: { id } });

      const recordError = controllerUtils.hasRecords(cat);

      if (recordError) {
        return controllerUtils.errorUtil(recordError, recordError.status, res, req);
      }

      if (fs.existsSync(cat.media)) {
        fs.rmSync(path.resolve(cat.media));
      }
      
      await cat.destroy()
        
      return res.status(200).send('Cat deleted!');
    } catch (error) {
      return controllerUtils.errorUtil(error, error.status, res, req);  
    }
  }
}

module.exports = {
    CatController
};
