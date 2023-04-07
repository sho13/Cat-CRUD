const authValidator = (username, password) => {
  if (!username || !password) {
    const error = new Error('Username and email are required!');
    error.status = 400;
    throw error;
  }
}

const errorUtil = (error, status, res, req) => {
  const message = error?.message ? error?.message : error?.toString ? error.toString() : 'API Error'
  
  return res.status(status || 500).send({ error: message, path: req ? req.path : null })
}

const hasRecords = (record) => {
  if (!record) {
    const error = new Error("Record not found!");
    error.status = 404;
    return error;
  }
}

const reqHasFile = (file) => {
  if (!file) {
    const error = new Error("No file provided!")
    error.status = 415
    return error
  }
}

const sessionValidator = (session) => {
  if (!(session.hasOwnProperty("sid") && session.hasOwnProperty("userId"))) {
    const error = new Error("Unauthorized!");
    error.status = 401;
    return error;
  }
};

module.exports = {
  authValidator,
  errorUtil,
  hasRecords,
  reqHasFile,
  sessionValidator
}