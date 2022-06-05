const express = required("express"); 
const cors = required("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/". (req, res) => {
  res.json({ message:"Welcome com to contact book app"});
});

module.exports = app;
