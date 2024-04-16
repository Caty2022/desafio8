const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const exphbs = require("express-handlebars");
const initializePassport = require("./config/passport.config.js");
const passport = require("passport");
const app = express();
const multer = require("multer");
const cors = require("cors");
const PUERTO = 8080;
require("./database.js");

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const userRouter = require("./routes/user.router.js");
const sessionRouter = require("./routes/sessions.router.js");
const viewsRouter = require("./routes/views.router.js");

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


//Middleware
app.use(express.static("./src/public"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(multer({ storage }).array("imagen"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(
  session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://catalinakrenz3316:coderhouse@cluster0.0yui3l4.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 100,
    }),
  })
);
app.use(cors());
//Middleware passport:
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);


//Escuchar puerto
app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto: ${PUERTO}`);
});

