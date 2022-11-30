const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// get posts
router.get("/", async (req, res) => {
  const posts = await loaodPostsCollection();
  res.send(await posts.find({}).toArray());
});

// add posts
router.post("/", async (req, res) => {
  const posts = await loaodPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// delete posts
router.delete("/:id", async (req, res) => {
  const posts = await loaodPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send();
});

async function loaodPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://user1:user1@cluster0.ijakx58.mongodb.net/test"
  );

  return client.db("test").collection("posts");
}

module.exports = router;
