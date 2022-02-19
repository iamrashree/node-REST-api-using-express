const express = require('express');
const router = express.Router();

// Return HTML template
router.get('/', (req, res) => {
    //res.send('Hello World!!');
    res.render('index', { title: 'My express App', message: 'Hello' });
});

module.exports = router;