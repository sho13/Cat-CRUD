require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./database/db");
const router = require('./router');
const removeUploadedFiles = require("multer/lib/remove-uploaded-files");

const app = express();
const port = process.env.PORT || 3000;
const sessionStore = new SequelizeStore({
  db: db,
  expiration: 3600000,
});

// Middleware //
app.use(express.json({ limit: "50mb", extended: false }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);
app.use(cookieParser());
app.use(
  session({
    name: "sid",
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: "yerrrrrr",
    store: sessionStore,
  })
);

db.sync();
sessionStore.sync();

app.use('/', router);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${port}`);
});
