// const { jwtVerify } = require("../../../../project-iseng/belajar-project/middleware/middleware");
const { authRole, jwtVerify } = require("../../middleware/auth");
const { app, express, jwt } = require("../../utils/require");

const router = express.Router();

const pinjamController = require("../controller/pinjamController");

router.post(
  "/create",
  jwtVerify(["admin", "member"]),
  authRole(["admin", "member"]),
  pinjamController.create
);

router.post(
  "/read",
  jwtVerify(["admin", "member"]),
  authRole(["admin", "member"]),
  pinjamController.read
);

router.post(
  "/returnBook",
  jwtVerify(["admin", "member"]),
  authRole(["admin", "member"]),
  pinjamController.returnBook
);

router.post(
  "/count",
  jwtVerify(["admin", "member"]),
  authRole(["admin", "member"]),
  pinjamController.count
);

module.exports = router;

// db.buku.insertOne({
//     nama:'si kancil',
//     slug:'si-kancil',
// kode:"23rt"
//     label
// })
