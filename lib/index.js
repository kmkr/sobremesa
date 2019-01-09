const express = require("express");
const compression = require("compression");
const hashStore = require("./hash-store");
const path = require("path");
const { getUser, updateUser } = require("./db");

const app = express();
app.disable("x-powered-by");
app.use(compression());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

const port = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === "production";

app.use(
  "/static",
  express.static(path.join(__dirname, "..", "/dist"), {
    maxAge: isProd ? 60 * 60 * 24 * 365 : 0 // 1 year
  })
);

app.get("/", async (req, res) => {
  const { spirit } = req.query;
  let user;
  if (spirit) {
    user = await getUser(spirit);
    updateUser(spirit, {
      numVisits: (user.numVisits || 0) + 1,
      hasSeenWelcomeMsg: true
    });
  }
  return res.render("index", {
    // favico100: hashStore.withHash('/static/images/favicon-100.png'),
    // favico192: hashStore.withHash('/static/images/favicon-192.png'),
    // favico: hashStore.withHash('/static/images/favicon.ico'),
    js: `/static/main.js?${hashStore.withHash(
      path.join("..", "dist", "main.js")
    )}`,
    user
    // css: hashStore.withHash(cssFile),
  });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
