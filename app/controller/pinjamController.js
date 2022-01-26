const randomstring = require("randomstring");
const { ObjectId } = require("mongodb");
const db = require("../../utils/db");
const { format, count, dateId } = require("../../functions");
// const { mongo } = require("./require");

// const { MongoClient, new ObjectId } = mongo;
exports.create = async (req, res) => {
  // query cek
  const pinjam = await db.pinjam.findOne({
    "buku._id": new ObjectId(req.body.id),
    "user._id": new ObjectId(req.session.loginL),
  });

  if (pinjam) {
    // cek jika user sudah meminjam buku ini
    res.status(400).json({
      status: "error",
      msg: "Anda sudah meminjam Buku ini",
    });
  } else {
    // cek format date
    const buku = await db.buku.findOne({ _id: new ObjectId(req.body.id) });
    const user = await db.anggota.findOne({
      _id: new ObjectId(req.session.loginL),
    });
    if (buku) {
      // create a code random
      const length = Math.floor(Math.random() * 30 + 10);
      const kode = randomstring.generate(length);
      console.log(kode);
      // cek jika tanggal kembali sudah masa lampau
      const now = dateId();
      const nowF = new Date(format(now)).getTime();
      const tanggal_kembali = new Date(format(req.body.date)).getTime();
      console.log(tanggal_kembali);
      if (nowF > 0 && tanggal_kembali > 0) {
        if (tanggal_kembali < nowF) {
          res.status(400).json({
            status: "error",
            msg: "Tanggal tidak boleh lebih kecil dari tanggal sekarang",
          });
        } else {
          const hari = count(format(req.body.date), "p");
          console.log(hari);
          if (hari <= 20) {
            // query database
            db.pinjam
              .insertOne({
                buku,
                user: user,
                kode,
                createdAt: dateId(),
                tanggal_kembali: format(req.body.date),
                status: "pending",
              })
              // ,
              //   tanggal_kembali: format(req.body.date),
              .then((e) => {
                res.status(201).json({
                  status: "success",
                  msg: "Silahan konfirmasi ke penjaga perpus",
                  body: e,
                });
              })
              .catch((e) => {
                res.status(400).json({
                  status: "error",
                  msg: e,
                });
              });
          } else {
            res.status(400).json({
              status: "error",
              msg: `Tidak boleh meminjam buku lebih dari 20 Hari`,
            });
          }
        }
      } else {
        res.status(400).json({
          status: "error",
          msg: "Invalid Date. valid date YYYY-MM-DD HH:MM:SS",
        });
      }
    } else {
      res.status(400).json({
        status: "error",
        msg: "Data buku tidak ada!",
      });
    }
  }
};

exports.read = (req, res) => {
  // db.pinjam
  //   .findOne({
  //     // "buku._id": new ObjectId(req.body.id),
  //     "user._id": new ObjectId(req.session.loginL),
  //   })
  //   .then((e) => {
  //     console.log(e);
  //   });

  db.pinjam
    .find({
      "user._id": new ObjectId(req.session.loginL),
    })
    .toArray()
    .then((e) => {
      res.status(200).json({
        status: "success",
        msg: "Data buku yang di pinjam berhasil di dapatakan",
        body: e,
      });
    })
    .catch((e) => {
      res.status(400).json({
        status: "error",
        msg: e,
      });
    });
};

exports.returnBook = (req, res) => {
  if (req.body.id && req.body.kode) {
    const pinjam = db.pinjam
      .deleteOne({
        _id: new ObjectId(req.body.id),
        "user._id": new ObjectId(req.session.loginL),
        kode: req.body.kode,
      })
      .then((e) => {
        res.status(200).json({
          status: "success",
          msg: "Data berhasil di hapus",
        });
      })
      .catch((e) => {
        res.status(400).json({
          status: "error",
          msg: "Data berhasil di hapus",
          err: e,
        });
      });
  } else {
    res.status(400).json({
      status: "error",
      msg: "Data tidak ada",
    });
  }
};

exports.count = async (req, res) => {
  const pinjamBuku = await db.pinjam.findOne({
    _id: new ObjectId(req.body.id),
    "user._id": new ObjectId(req.session.loginL),
    kode: req.body.kode,
  });

  if (pinjamBuku) {
    const datePinjam = format(pinjamBuku.tanggal_kembali);
    // console.log(str);

    // haricount
    const hariCount = count(datePinjam);
    if (hariCount < 0) {
      res.status(200).json({
        status: "success",
        msg: `Buku dikembalikan pada tanggal ${datePinjam}. Jangan lupa dikembalikan tepat waktu ya! \n `,
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: `Terlambat mengembalikan buku ${hariCount} Hari dan dikenakan denda ${
          hariCount * 10000
        }`,
        body: {
          hari: hariCount,
          jumlahDenda: hariCount * 10000,
        },
      });
    }
  } else {
    res.status(400).json({
      status: "error",
      msg: "Data tidak ada",
    });
  }
};
