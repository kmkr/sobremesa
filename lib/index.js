const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const hashStore = require("./hash-store");
const path = require("path");
const { getUser, updateUser } = require("./db");

const app = express();
app.disable("x-powered-by");
app.use(compression());
app.use(bodyParser.json());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

const port = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === "production";

function cleanUserName(arg) {
  return (arg || "").toLowerCase().trim();
}

// app.use((req, res, next) => {
//   if (req.method !== "GET") {
//     console.log("method");
//     return next();
//   }

//   const proto = req.get("x-forwarded-proto");
//   console.log("proto", proto);
//   if (!proto || proto === "https") {
//     console.log("proto");
//     return next();
//   }

//   console.log("hadde redirected.");
//   next();
//   //res.redirect("https://" + req.header("Host") + req.originalUrl);
// });

app.use(
  "/static",
  express.static(path.join(__dirname, "..", "/dist"), {
    maxAge: isProd ? 60 * 60 * 24 * 365 : 0 // 1 year
  })
);

app.use(
  "/assets",
  express.static(path.join(__dirname, "..", "/assets"), {
    maxAge: isProd ? 60 * 60 * 24 * 365 : 0 // 1 year
  })
);

app.get("/", async (req, res) => {
  const spirit = cleanUserName(req.query.spirit);
  let user;
  let missingUser = false;
  if (spirit) {
    user = await getUser(spirit);
    if (user) {
      updateUser(spirit, {
        ua: req.get("User-Agent"),
        numVisits: (user.numVisits || 0) + 1,
        hasSeenWelcomeMsg: true
      });
    } else {
      missingUser = spirit;
    }
  }
  return res.render("index", {
    // favico100: hashStore.withHash('/static/images/favicon-100.png'),
    // favico192: hashStore.withHash('/static/images/favicon-192.png'),
    // favico: hashStore.withHash('/static/images/favicon.ico'),
    css: `/static/main.css?${hashStore.withHash(
      path.join("..", "dist", "main.css")
    )}`,
    js: `/static/main.js?${hashStore.withHash(
      path.join("..", "dist", "main.js")
    )}`,
    user,
    missingUser
  });
});

app.post("/user", async (req, res) => {
  const { userName, email } = req.body;

  if (!userName || !email) {
    return res.status(400).end();
  }

  return updateUser(cleanUserName(userName), { email })
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(500).end();
    });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
