const db = require("../../utils/db");
const { jwt } = require("../../utils/require");
const randomstring = require("randomstring");

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.anggota
    .find({
      email: req.body.email,
    })
    .toArray()
    .then((e) => {
      if (e[0].email == email && e[0].password == password) {
        const token = jwt.sign({ email: email, scopes: "admin" }, "perpusGG");
        req.session.loginL = e[0]._id;
        res.status(200).json({
          status: "success",
          msg: e,
          token: token,
        });
      } else {
        res.status(401).json({
          status: "error",
          msg: "Password yang anda masukan salah!",
        });
      }
    })
    .catch((e) => {
      res.status(401).json({
        status: "error",
        msg: "Email yang anda masukan salah!",
      });
    });
};

exports.register = async (req, res) => {
  if (req.body.password && req.body.email) {
    const data = await db.anggota
      .find({
        email: req.body.email,
      })
      .toArray();
    if (data.length !== 0) {
      res.status(401).json({
        status: "error",
        msg: "Email ini sudah terdaftar",
      });
    } else {
      const length = Math.floor(Math.random() * 30 + 10);
      const kode = randomstring.generate(length);
      db.anggota
        .insertOne({
          email: req.body.email,
          password: req.body.password,
          role: "admin",
          kode,
        })
        .then((e) => {
          res.status(201).json({
            status: "success",
            msg: e,
          });
        })
        .catch((e) => {
          res.status(401).json({
            status: "error",
          });
        });
    }
  }
};
