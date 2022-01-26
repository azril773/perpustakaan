// const { jwtVerify } = require("../../../../project-iseng/belajar-project/middleware/middleware");
const { authRole, jwtVerify } = require("../../middleware/auth");
const { app, express, jwt } = require("../../utils/require");

const router = express.Router();

const adminContoller = require("../controller/adminController");

router.post(
  "/createMember",
  jwtVerify(["admin"]),
  authRole(["admin"]),
  adminContoller.createMember
);

router.post(
  "/viewConfirm",
  jwtVerify(["admin"]),
  authRole(["admin"]),
  adminContoller.viewConfirm
);

router.post(
  "/confirm",
  jwtVerify(["admin"]),
  authRole(["admin"]),
  adminContoller.confirm
);

router.post(
  "/createBook",
  jwtVerify(["admin"]),
  authRole(["admin"]),
  adminContoller.createBook
);

module.exports = router;

// db.buku.insertOne({
//     nama:'si kancil',
//     slug:'si-kancil',
// kode:"23rt"
//     label
// })
