require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cokiePaser = require('cookie-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
