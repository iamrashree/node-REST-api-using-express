const express = require('express');
const app = new express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
