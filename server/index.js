const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router();

//midleware
app.use(bodyParser.json());
app.use(cors());

const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

//handle producion
if (process.env.NODE_ENV === "production") {
  //static folder
  // app.use(express.static(__dirname + "/public"));
  app.use(express.static("/.netlify/functions/api", router));

  //handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
