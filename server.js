'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, reponse) => {
    reponse.send('This is the Mighty Home Route, bow or die.');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
