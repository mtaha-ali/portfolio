const fetch = require('node-fetch-commonjs')
const apiURL = "https://www.catch.com.au/api";

/**
 * Gets Info from Catch Product Id
 * @param {string | number} catchProductId - Catch.com.au Product Id
 * @returns {Promise<{catchProductId: number, title: string, thumbnailImage: string, lowestPrice: {amount: number, currency: string}, lowestSeller: {id: string, name: string, slug: string}}>}
 */
async function getCatchProductInfo(catchProductId) {
    resp = await fetch(apiURL, {
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "operationName": "BuyBox",
            "variables": {
                "productId": catchProductId.toString()
            },
            "query": `query BuyBox($productId: ID!) {
                productById(input: { id: $productId }) { 
                  title
                  assets { 
                    hero {
                      url
                    }
                  }  
                  variants { 
                    offers { 
                      ...OfferData
                    }
                  }
                } 
              } 
              
              fragment OfferData on Offer {
                seller { 
                  id
                  name
                  slug
                } 
                sellPrice { 
                  amount
                  currency
                 }
              }`
        }),
        "method": "POST"
    });
    resp = await resp.json()
    if (resp.errors) {
        throw Error(resp.errors[0].message);
    } else if (resp.data) {
        let title = resp.data.productById.title
        let thumbnailImage = resp.data.productById.assets.hero.url
        let offer = resp.data.productById.variants[0].offers[0]
        let offerPrice = offer.sellPrice;
        let offerSeller = offer.seller
        return {
            catchProductId,
            title,
            thumbnailImage,
            lowestPrice: { amount: offerPrice.amount / 100, currency: offerPrice.currency },
            lowestSeller: offerSeller
        }
    }
    throw Error("Unknown Error");
}

module.exports = {
    getCatchProductInfo
}