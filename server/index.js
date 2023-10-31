const express = require('express');
const cors = require('cors');
const cokiePaser = require('cookie-parser');

const PORT = 5000;
const app = express();

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();
