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
function sendPage(res, status = 200, page = "index.html") {
    return res.status(status).sendFile(path.join(__dirname, '../pages/', page));
}

router.get('/', async (req, res) => {
    return sendPage(res);
})

router.get('/e-commerce',async(req,res)=>{
    return sendPage(res, 200, "ecommerce.html")
})

router.get('/roblox',async(req,res)=>{
    return sendPage(res, 200, "roblox.html")
})

// 404 Not Found
router.use((req, res) => {
    return sendPage(res, 404, "not_found.html");
});

// Error Handling
router.use((err, req, res, next) => {
    console.log(err);
    return sendPage(res, 500, "unknown_error.html");
})

module.exports = router;