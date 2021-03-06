const { MongoClient } = require("mongodb");

const getFromCollection = require("./get-from-collection");
const updateOneInCollection = require("./update-one-in-collection");

const {
  SOBR_DATABASE_HOST,
  SOBR_DATABASE_NAME,
  SOBR_DATABASE_PASSWORD,
  SOBR_DATABASE_USER
} = process.env;

const url = `mongodb://${SOBR_DATABASE_USER}:${SOBR_DATABASE_PASSWORD}@${SOBR_DATABASE_HOST}/${SOBR_DATABASE_NAME}`;
const getDb = new Promise((resolve, reject) => {
  const client = new MongoClient(url, {
    useNewUrlParser: true
  });
  client.connect((err, res) => {
    if (err) {
      return reject(err);
    }

    return resolve(res.db(SOBR_DATABASE_NAME));
  });
});

module.exports.getUser = async function(userName) {
  const db = await getDb;
  const users = await getFromCollection(db, "users", {
    name: new RegExp(`^${userName}$`, "i")
  });
  return users[0];
};

module.exports.updateUser = async function(userName, newValues) {
  const db = await getDb;
  await updateOneInCollection(
    db,
    "users",
    { name: new RegExp(`^${userName}$`, "i") },
    newValues
  );
  return;
};
