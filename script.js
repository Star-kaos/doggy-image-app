const mainDiv = document.getElementById("mainDiv")
const titlediv = document.getElementById("titleDiv")
const imgDiv = document.getElementById("imgDiv")


async function loadUrlData(dogURL) {
    console.log("calling...")
    const response = await axios.get(dogURL).catch(error => error.response)
    console.log(response.data)
    console.log("called!")
    if (response.status === 200) {
        displayImgs(response)
    }
    console.log(response)
    if (response.status === 404) {
        displayError(response)
        console.log("doesent exist")
    }
    document.getElementById("userDogInput").value = "";

}

document.getElementById("userDogInput").addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
        event.preventDefault();
        const userDog = document.getElementById("userDogInput").value
        const dogURL = `https://dog.ceo/api/breed/${userDog}/images/random/20`;
        loadUrlData(dogURL)
    }
});

async function displayImgs(response) {

    for (let i = 0; i < response.data.message.length; i++) {
        let imgDivs = document.createElement("div");
        imgDivs.setAttribute("id", "imgDivs")
        imgDiv.appendChild(imgDivs)
        imgDivs.innerHTML = `<img src="${response.data.message[i]}">`
        document.getElementById("userDogInput").addEventListener("keypress", (event) => {
            if (event.code === "Enter") {
                imgDivs.remove()
            }
        });
    }
}

async function displayError(response) {
    let errorDiv = document.createElement("div");
    errorDiv.setAttribute("id", "errorDiv")
    imgDiv.appendChild(errorDiv)
    errorDiv.innerHTML = `<h1>${response.data.message} Try again.</h1>`
    document.getElementById("userDogInput").addEventListener("keypress", (event) => {
        if (event.code === "Enter") {
            errorDiv.remove()
        }
    });

}
