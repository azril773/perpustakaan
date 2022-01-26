const expressEjsLayouts = require("express-ejs-layouts");
const {
  express,
  app,
  layoutEjs,
  cookieParser,
  session,
  jwt,
} = require("./utils/require");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(expressEjsLayouts);

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const indexRoutes = require("./app/router/indexRoutes");

const authRoutes = require("./app/router/authRoutes");

const pinjamRoutes = require("./app/router/pinjamRoutes");
// console.log(pinjamRoutes);

const adminRoutes = require("./app/router/adminRoutes");

app.use("/", pinjamRoutes);

app.use("/", adminRoutes);

app.use("/", indexRoutes);

app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("connect 3000");
});
