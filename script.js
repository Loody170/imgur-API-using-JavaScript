const clientId = "b7d9543e5c1356a";

var defaultAlbumId = '';

function requestAlbumXHR() {
    let albumId = document.getElementById("albumIdField").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            //processAlbumRequest(req.responseText);
            let response = JSON.parse(req.responseText)
            for(item of response.data){
                console.log(item)
                let imgElem = document.createElement("img");
                imgElem.src = item.link;

                resultDiv.appendChild(imgElem);
            }
        }
        else if (req.readyState == 4 && req.status != 200) {
            console.log(req.status + " Error with the imgur API: ", req.responseText);
        }
    }
    req.open('GET', 'https://api.imgur.com/3/album/' + albumId + '/images', true); // true for asynchronous     
    req.setRequestHeader('Authorization', 'Client-ID ' + clientId);
    req.send();
}

function requestAlbumFetch(){
    let albumId = document.getElementById("albumIdField").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    fetch(`https://api.imgur.com/3/album/${albumId}/images`, {
  method: 'GET',
  headers: {
    Authorization: `Client-ID ${clientId}`
  }
})
  .then(response => response.json())
  .then(data => {
    for(item of data.data){
        console.log(item)
        let imgElem = document.createElement("img");
        imgElem.src = item.link;
        resultDiv.appendChild(imgElem);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

async function callAPIUsingAsyncAwait(){
    let albumId = document.getElementById("albumIdField").value;
    try {
        const response = await fetch(`https://api.imgur.com/3/album/${albumId}/images`, {
          method: 'GET',
          headers: {
            Authorization: `Client-ID ${clientId}`
          }
        });
      
        if (!response.ok) {
          throw new Error('Request failed');
        }
      
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
        // Handle the error as needed
      }
    };

    function requestAlbumAsyncAwait(){
        let resultDiv = document.getElementById("result");
        callAPIUsingAsyncAwait()
        .then(data => {
            // Process the data returned from the API
            console.log(data);
            for(item of data.data){
                console.log(item)
                let imgElem = document.createElement("img");
                imgElem.src = item.link;
                resultDiv.appendChild(imgElem);
            }
        });
    }





