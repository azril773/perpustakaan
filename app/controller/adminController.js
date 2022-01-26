const randomstring = require("randomstring");
const { ObjectId } = require("mongodb");
const db = require("../../utils/db");
const { format, count, dateId } = require("../../functions");

exports.createMember = async (req, res) => {
  if (req.body.email && req.body.nama && req.body.password) {
    const data = await db.anggota.findOne({
      email: req.body.email,
    });
    if (data) {
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
          nama: req.body.nama,
          password: req.body.password,
          role: req.body.role,
          kode,
          createdAt: dateId(),
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
  } else {
    res.status(401).json({
      status: "error",
      msg: "Silahkan masukan data data yang diperlukan",
    });
  }
};

exports.viewConfirm = async (req, res) => {
  const data = await db.pinjam.find({ status: "pending" }).toArray();
  if (data.length !== 0) {
    res.status(200).json({
      status: "success",
      msg: data,
    });
  } else {
    res.status(401).json({
      status: "error",
      msg: "Data buku tidak ada",
    });
  }
};

exports.confirm = async (req, res) => {
  if (req.body.id && req.body.kode) {
    const id = req.body.id.trim();
    const kode = req.body.kode.trim();
    const data = await db.pinjam
      .updateOne(
        {
          _id: new ObjectId(id),
          kode: kode,
        },
        {
          $set: { status: "success" },
        }
      )
      .then((e) => {
        res.status(200).json({
          status: "success",
          msg: "Data berhasil di update",
        });
      })
      .catch((e) => {
        res.status(400).json({
          status: "error",
          msg: "Data gagal di update",
          OverconstrainedError: e,
        });
      });
  } else {
    res.status(401).json({
      status: "error",
      msg: "Silahkan masukan data data yang diperlukan",
    });
  }
};

exports.createBook = async (req, res) => {
  if (!req.body.nama && !req.body.cerita && !req.body.kategori) {
    res.status(401).json({
      status: "error",
      msg: "Silahkan masukan data data yang diperlukan",
    });
  } else {
    const buku = await db.buku.find({ nama: req.body.nama }).toArray();
    if (buku.length !== 0) {
      res.status(400).json({
        status: "error",
        msg: "Data buku sudah ada!",
      });
    } else {
      const length = Math.floor(Math.random() * 30 + 10);

      const nama = req.body.nama;
      const slug = nama.trim().toLowerCase().split(" ").join("-");
      const kode = randomstring.generate(length);
      const cerita = req.body.cerita;
      const kategori = req.body.kategori;

      db.buku
        .insertOne({
          nama,
          slug,
          kode,
          createdAt: dateId(),
          kategori,
          cerita,
        })
        .then((e) => {
          res.status(201).json({
            status: "success",
            msg: "Success create data buku",
            body: {
              nama,
              slug,
            },
          });
        })
        .catch((e) => {
          res.status(400).json({
            status: "error",
            msg: e,
          });
        });
    }
  }
};
