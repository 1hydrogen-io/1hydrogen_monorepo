var path = require("path");
var express = require("express");
var app = express();
var cors = require("cors");
const axios = require("axios");
app.use(express.json());
app.use(cors());
const host = "https://waitlist-api.prod.blast.io";

app.get("*", async (req, res) => {
  try {
    const path = req.path.replace("/blastpointapi", "");
    const response = await axios.get(`${host}${path}`, {
      headers: { authorization: req.headers.authorization },
    });
    res.json(response.data); // Forward the data from the external API
  } catch (error) {
    res.send(error); // Handle errors appropriately
  }
});

app.post("*", async (req, res) => {
  try {
    const path = req.path.replace("/blastpointapi", "");
    const data = req.body; // Access the request body data as a JavaScript object
    const response = await axios.post(`${host}${path}`, data, {
      headers: { authorization: req.headers.authorization },
    });
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

app.put("*", async (req, res) => {
  try {
    const path = req.path.replace("/blastpointapi", "");
    const data = req.body; // Access the request body data as a JavaScript object

    const response = await axios.put(`${host}${path}`, data);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3002, function () {
  console.log("Listening on http://localhost:3002/");
});
