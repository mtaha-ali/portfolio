const express = require("express");
const router = express.Router();
const path = require('path');

/**
 * Gets page from pages and sends
 * @param {Response} res 
 * @param {string} page - Response to put in message if success true
 * @param {number} [status=200] - Status Code to Send
 * @returns
 */
function sendPage(res, page, status=200) {
    return res.status(status).sendFile(path.join(__dirname,'../pages/',page));
}

router.get('/', async (req, res) => {
    return sendPage(res,"index.html");
})

// 404 Not Found
router.use((req, res) => {
    return sendPage(res, "not_found.html", 404);
});

// Error Handling
router.use((err, req, res, next) => {
    console.log(err);
    return sendPage(res, "unknown_error.html", 500);
})

module.exports = router;