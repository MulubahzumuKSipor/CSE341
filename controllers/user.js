const mongodb = require("../data/database");
const objectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res) => {
  const result = await mongodb.getDb().db().collection("accounts").find();
  result
    .toArray()
    .then((accounts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(accounts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const getUserById = async (req, res) => {
  const userId = objectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("accounts")
    .find({ _id: userId });
  result
    .toArray()
    .then((accounts) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(accounts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
};
