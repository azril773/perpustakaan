// const { jwtVerify } = require("../../../../project-iseng/belajar-project/middleware/middleware");
const { authRole, jwtVerify } = require("../../middleware/auth");
const { app, express, jwt } = require("../../utils/require");

const router = express.Router();

const indexController = require("../controller/indexController");

router.post(
  "/index",
  jwtVerify(["admin", "member"]),
  authRole(["admin", "member"]),
  indexController.index
);

router.post(
  "/byId",
  jwtVerify(["admin", "member"]),
  authRole(["admin", "member"]),
  indexController.byId
);

router.post(
  "/byKategori",
  jwtVerify(["admin", "member"]),
  authRole(["admin", "member"]),
  indexController.byKategori
);

module.exports = router;

// db.buku.insertOne({
//     nama:'si kancil',
//     slug:'si-kancil',
// kode:"23rt"
//     label
// })
