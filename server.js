const express = require("express");
const cors = require("cors");
const connectDB = require("./dbinit");
const dotenv = require("dotenv");
const apiUser = require("./routes/user.router");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3005;

//use CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//use router
app.use([apiUser]);

// init db
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
