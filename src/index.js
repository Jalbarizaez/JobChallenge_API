const express = require("express");
const cors = require("cors");
const app = express();
const packageRoutes = require('./routes/package');

app.use(express.json());
app.use(cors());
app.use(packageRoutes);

app.get("/", (req, res) =>{
    res.send("hello world!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});