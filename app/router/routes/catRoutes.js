const router = require("express").Router();
const multer = require("multer");

const { CatController } = require("../../controllers");

const multerStorage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, "./");
  },
  filename: (_, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return new Error("Unsupported Media Type");
    }
  },
});

router.get('/cats', CatController.retrieveAll)
router.get('/cats/:id', CatController.retrieveOne)

router.post('/cats', upload.single("media"), CatController.create)
router.put('/cats/:id', upload.single("media"), CatController.update)
router.delete('/cats/:id', CatController.delete)
module.exports = router;
