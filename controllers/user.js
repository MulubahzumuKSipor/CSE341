const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

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
  const userId = new ObjectId(req.params.id);
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

const createUser = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("accounts")
    .insertOne(user);
  if (result.acknowledged) {
    res.status(201).json(result);
    console.log(result);
  } else {
    res.status(500).json({ error: "Failed to create user" });
  }
};
const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("accounts")
    .replaceOne({ _id: userId }, user);
  if (result.acknowledged) {
    res.status(204).json(result);
  } else {
    res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("accounts")
    .deleteOne({ _id: userId });
  if (result.acknowledged) {
    console.log("User deleted");
    res.status(204).json(result);
  } else {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
