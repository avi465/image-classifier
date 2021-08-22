document.getElementById("icon").addEventListener("click", function () {
    document.getElementById("search-box").style.visibility = "hidden";
    document.getElementById("image-picker").style.visibility = "visible";
})


document.getElementById("cut").addEventListener("click", function () {
    document.getElementById("image-picker").style.visibility = "hidden";
    document.getElementById("search-box").style.visibility = "visible";
})


document.getElementById("my-form").onsubmit = function (event) {
    let value = document.getElementById("text-input").value;
    document.getElementById("preview").setAttribute("src", value);
    document.getElementById("img").setAttribute("src", value);

    app();
    event.preventDefault();
}


const inputElement = document.getElementById("image_uploads");
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    const fileList = this.files;

    let preview = document.getElementById("preview");
    preview.src = URL.createObjectURL(fileList[0]);
    let processImg = document.getElementById("img");
    processImg.src = URL.createObjectURL(fileList[0]);
    preview.onload = function () {
        URL.revokeObjectURL(preview.src) // free memory
    }
    processImg.onload = function () {
        URL.revokeObjectURL(processImg.src) // free memory
    }
    document.getElementById("image-picker").style.visibility = "hidden";
    document.getElementById("search-box").style.visibility = "visible";

    app();
}


// Image classifier
let imageClassifier;

async function app() {
    document.getElementById("data-container").style.display = "none"
    document.getElementById("loader-position").style.display = "flex";
    
    // Load the model.
    imageClassifier = await mobilenet.load();
    document.getElementById("loader-position").style.display = "none";
    document.getElementById("data-container").style.display = "block"

    // Make a prediction through the model on our image.
    const imgEl = document.getElementById('img');
    const result = await imageClassifier.classify(imgEl);
    document.getElementById("predicted-data").innerText = "Predicted Class: " + result[0].className + ", Probability: " + result[0].probability;
    // console.log(result);
}

app();