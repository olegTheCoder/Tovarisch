const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const session = require("express-session");
const FileStore = require("session-file-store")(session);

const radiusRouter = require("./src/routes/radiusRouter");
const userRouter = require("./src/routes/userRouter");
const incidentRouter = require("./src/routes/incidentRouter");
const commentRouter = require("./src/routes/commentRouter");

const PORT = process.env.PORT ?? 3000;

const sessionConfig = {
  store: new FileStore(),
  key: "elbrusid",
  secret: process.env.SECRET ?? "secret",
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: { expires: 24 * 60 * 60e3 },
};

const sessionParser = session(sessionConfig);

app.use(cors());
app.use(sessionParser);
app.use(fileUpload());
app.use(express.static(path.join(process.env.PWD, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.uploads = process.env.STATIC_PATH;
    res.locals.userId = req.session.userId;
    res.locals.userName = req.session.userName;
  }
  next();
});

app.use("/user", userRouter);
app.use("/incident", incidentRouter);
app.use("/comment", commentRouter);
app.use("/radius", radiusRouter);

app.listen(PORT, () => {
  console.log(`Server has been started on PORT: ${PORT}`);
});
