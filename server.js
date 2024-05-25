const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const  {connect}  = require("./connection/db");
dotenv.config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
connect();



app.use("/api/User", require("./Router/userRouter"));



app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
