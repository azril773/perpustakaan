const { jwt } = require("../utils/require");
const db = require("../utils/db");
const { mongo } = require("../utils/require");

const { MongoClient, ObjectId } = require("mongodb");

exports.jwtVerify = (credentials = []) => {
  if (typeof credentials == "string") {
    credentials = [credentials];
  }
  return (req, res, next) => {
    // console.log(req.body);
    // next()
    const token = req.headers["authorization"];
    // console.log(token);
    if (!token) {
      res.status(401).json({
        status: "error",
        msg: "Access denied",
      });
    } else {
      jwt.verify(token, "perpusGG", (err, decode) => {
        if (err) {
          res.status(401).json({
            status: "error",
            msg: "Token Invalid",
          });
        }
        next();
        // next();
      });
    }
    // next()
  };
};

exports.authRole = (permission) => {
  return (req, res, next) => {
    const data = db.anggota
      .findOne({
        _id: new ObjectId(req.session.loginL),
      })
      .then((e) => {
        if (permission.includes(e.role)) {
          next();
        } else {
          res.status(401).json({
            status: "error",
            msg: "Access denied!",
          });
        }
      });
  };
};
