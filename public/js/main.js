const weburl = '/api'

function sendAPIrequest(type, endpoint, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(type, weburl + endpoint, true);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve({
                        status: xhr.status,
                        response: xhr.responseText ? JSON.parse(xhr.responseText) : undefined
                    })
                } else {
                    // API call failed
                    reject({
                        status: xhr.status,
                        response: xhr.responseText ? JSON.parse(xhr.responseText) : undefined
                    })
                }
            }
        };
        if (type == "POST" && data) {
            xhr.setRequestHeader('Content-Type', "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

async function checkCatch() {
    const productId = document.getElementById("productId").value;
    const responseContainer = document.querySelector(".code-block");
    let resp; 
    try {
        responseContainer.innerText = "Loading..."
        resp = await sendAPIrequest("GET",`/catch/product/${productId}`);
    } catch (error) {
        resp = error;
    }
    console.log(resp);
    responseContainer.innerText = JSON.stringify(resp,null,"\t");
}

async function checkCostco() {
    const productId = document.getElementById("productId").value;
    const responseContainer = document.querySelector(".code-block");
    let resp; 
    try {
        responseContainer.innerText = "Loading..."
        resp = await sendAPIrequest("GET",`/costco/product/${productId}`);
    } catch (error) {
        resp = error;
    }
    console.log(resp);
    responseContainer.innerText = JSON.stringify(resp,null,"\t");
}