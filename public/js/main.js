const weburl = '/api'

function sendAPIrequest(type, endpoint, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(type, weburl + endpoint, true);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
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