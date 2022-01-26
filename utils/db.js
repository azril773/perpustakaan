const { mongo } = require("./require");

const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect("mongodb://localhost:27017", async (err, client) => {
  await client.connect()
  const db = client.db("perpus");
  exports.ObjectId = ObjectId;
  exports.anggota = db.collection("anggota");
  exports.buku = db.collection("buku");
  exports.pinjam = db.collection("pinjam");
});
