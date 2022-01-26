const randomstring = require("randomstring");
const { ObjectId } = require("mongodb");
const db = require("../../utils/db");
const { format, count, dateId } = require("../../functions");

exports.index = async (req, res) => {
  const data = await db.buku.find({}).toArray();
  res.status(200).json({
    status: "success",
    body: data,
  });
};

exports.byId = async (req, res) => {
  if (req.body.id) {
    const data = await db.buku.findOne({ _id: new ObjectId(req.body.id) });
    res.status(200).json({
      status: "success",
      body: data,
    });
  } else {
    res.status(400).json({
      status: "error",
      msg: `Silahkan masukan data data yang diperlukan`,
    });
  }
};

exports.byKategori = async (req, res) => {
  if (req.body.kategori) {
    const data = await db.buku
      .find({ kategori: new ObjectId(req.body.id) })
      .toArray();
    if (data.length !== 0) {
      res.status(200).json({
        status: "success",
        body: data,
      });
    } else {
      res.status(400).json({
        status: "error",
        msg: `Data buku dengan kategori ${req.body.kategori} tidak ada`,
      });
    }
  } else {
    res.status(400).json({
      status: "error",
      msg: `Silahkan masukan data data yang diperlukan`,
    });
  }
};
