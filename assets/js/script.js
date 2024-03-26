let inputFile = document.getElementById('input-file')

const updateImage = async function (inputFile) {
    let mainImage = document.getElementById('mainImg')
    
    // Create URL 
    const url = URL.createObjectURL(inputFile.files[0])
    
    // Set the URL as the new main image
    mainImage.src = url
    
    // Send url to the server
    sendUrlToServer(url)

    return url
}

async function sendUrlToServer(imgUrl) {
    // Send a POST request to the server with the img URL
    try {
        const response = await fetch('/picture/update', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({path: imgUrl})
        })
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error('error');
    }
}

