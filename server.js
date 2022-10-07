const express = require("express");
const path = require("path");
const session = require("express-session");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });

// import sequelize connection
const sequelize = require("./config/connection");
const SequilizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 48 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequilizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Turns on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
  });
});
