require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const graphqlHttp = require("express-graphql");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");

const authMiddleware = require("./middleware/middleware_auth");

const MAX_AGE = 1000 * 60 * 60;
const IN_PROD = process.env.NODE_ENV === "production";

const config = {
  origin: "http://localhost:3000",
  credentials: true
};

const PORT = process.env.PORT || 8080;

app.use(cors(config));

app.use(
  session({
    cookie: {
      maxAge: MAX_AGE,
      sameSite: true,
      secure: IN_PROD
    },
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(
  "/api/ver0001/graphql",
  (req, _, next) => {
    console.log("req made");
    return next();
  },
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        console.log("err", err);
        return err;
      }
      console.log("err", err);
      const data = err.originalError.data;
      const message = err.message || "An error occurred";
      const code = err.originalError.code || 500;
      return {
        message: message,
        status: code,
        data: data
      };
    }
  })
);

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/prok-db", {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(result => {
    const server = app.listen(PORT, () =>
      console.log(`app is listening on PORT ${PORT}`)
    );
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
