// DOM Elements & Variables

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0
let totalImages = 0
let photosArray = []




// Unsplash API

const count = 30
const apiKey = API_KEY

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`






// Check if all images were loaded
function imageLoaded() {
    loader.hidden = true
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
    }
}


// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length

    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> for photo
        const image = document.createElement('img')
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Event Listener, check when each is finished loading
        image.addEventListener('load', imageLoaded)

        // Put <img> inside <a>, & put both inside imageContainer
        item.appendChild(image)
        imageContainer.appendChild(item)
    })
}


// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch (error) {
        console.log(error)
    }
}




// Infinite Scroll Functionality
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})




// On Load
getPhotos()