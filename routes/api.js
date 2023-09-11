const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { getCatchProductInfo } = require("../apiConnectors/catch");
const { getCostcoProductInfo } = require("../apiConnectors/costco");

/**
 * Sends a JSON Response in the Format
 * ```typescript
 * {
 *  success: boolean,
 *  message: any | undefined,
 *  error: any | undefined
 * }
 * ```
 * @param {Response} res 
 * @param {number} [status=200] - Status Code to Send
 * @param {*} [response] - Response to put in message if success true
 * @param {boolean} [success=status==200] - Should it output message or error
 * @returns
 */
function sendResponse(res, status = 200, response = undefined, success = status == 200) {
    return res.status(status).json({ success: success, message: success ? response : undefined, error: success ? undefined : response });
};

router.use(bodyParser.json({ limit: "50mb" }));
router.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);
router.use(express.json());

router.get('/', async (req, res) => {
    return sendResponse(res,200);
})

router.get('/catch/product/:productId', async (req,res)=>{
    try {
        const {productId} = req.params;
        return sendResponse(res, 200, await getCatchProductInfo(productId));
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
})

router.get('/costco/product/:productId', async (req,res)=>{
    try {
        const {productId} = req.params;
        return sendResponse(res, 200, await getCostcoProductInfo(productId));
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
})

// 404 Not Found
router.use((req, res) => {
    return sendResponse(res, 404, "NOT_FOUND_API");
});

// Error Handling
router.use((err, req, res, next) => {
    return sendResponse(res, 500, err);
})

module.exports = router;