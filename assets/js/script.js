let mainImage = document.getElementById('mainImg')
let inputFile = document.getElementById('input-file')

inputFile.onchange = function() {
    mainImage.src = URL.createObjectURL(inputFile.files[0])
}