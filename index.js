require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const db = require("./config/config");
const passport_jwt = require("./config/passort_jwt");
const cookieParser = require("cookie-parser");
const compression = require("compression");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(compression({ level: 6 }));

// multer errors
app.use(function (err, req, res, next) {
  res.status(500).json({ err: err });
});

app.use("/upload", express.static("upload"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});
app.use("/api", require("./routes"));
app.use((req, res, next) => {
  res.status(404).json({ error: "url not found" });
});

app.listen(port, () =>
  console.log(`Example app listening on port port! ${port}`)
);
