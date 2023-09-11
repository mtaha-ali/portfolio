const fetch = require("node-fetch-commonjs")
const apiURL = "https://www.costco.com.au/rest/v2/australia";

/**
 * Gets Costco Product Price Info from Product Id
 * @param {string} costcoProductId - Costco Product Id
 * @returns {Promise<{costcoProductId: number | string, title: string, thumbnailImage: string, price: {amount: number, currency: string, validity: string}, stock: string}>}
 */
async function getCostcoProductInfo(costcoProductId) {
    try {
        const response = await fetch(`${apiURL}/metadata/productDetails?code=${costcoProductId}&lang=en_AU&curr=AUD`);

        if (response.ok) {
            const data = await response.json();
            if (data && "schemaOrgProduct" in data) {
                const title = data["metaTitle"];
                const thumbnailImage = data["image"];
                const schemaOrgProduct = JSON.parse(data["schemaOrgProduct"]);
                if (schemaOrgProduct && "offers" in schemaOrgProduct && "price" in schemaOrgProduct["offers"]) {
                    const productPrice = schemaOrgProduct["offers"]["price"];
                    const productCurrency = schemaOrgProduct["offers"]["priceCurrency"];
                    const productPriceValidity = schemaOrgProduct["offers"]["priceValidUntil"];
                    const productAvailability = schemaOrgProduct["offers"]["availability"].replace("http://schema.org/", "");
                    return {
                        id: costcoProductId,
                        title,
                        thumbnailImage,
                        price: {
                            amount: parseFloat(productPrice),
                            currency: productCurrency,
                            validity: productPriceValidity
                        },
                        stock: productAvailability
                    };
                }
            }
        } else {
            data = await (response.json())
            if (data && "errors" in data) {
                errors = data["errors"].map((item) => { return item["type"] + " | " + item["message"] })
                throw Error(errors.join(", "))
            }
        }
        throw Error("Unknown Error");
    } catch (err) {
        throw Error(err.message);
    }
}

module.exports = {
    getCostcoProductInfo
}