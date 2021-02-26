const itunesUrl = 'https://itunes.apple.com/search?term='
const form = document.querySelector('.form-field')
const songSection = document.querySelector('.song-section')
let songPlayer = document.querySelector('.sound-control')

// establishing some global variables

form.addEventListener('submit', event => {
    event.preventDefault()
    clearInputs()
    clearError()
    listSongs()
})
// listening for the 'submit' to be pressed then in order calling the 2 functions
// first clearInputs in order to remove any unwanted leftover searches from previous
// submits but then after to render the new searches on the page

const btn = document.querySelector('.btn-toggle');

// Listen for a click on the button
btn.addEventListener('click', function() {
// Then toggle (add/remove) the .dark-theme class to the body
    document.body.classList.toggle('dark-mode');  
})

function listSongs() {
    let songInput = document.querySelector('input').value
// this applies a variable name to the user input data they will give us

    fetch(itunesUrl + songInput + '&limit=12')
// this fetch request uses our established itunes url variable and applies the user input
// data into it to fetch what the user wanted to, also limits the search to 12
        .then(response => response.json())
// changing the data I got from the fetch and making it into json data
        .then(data => {
// taking that information and console logging the data it has
            console.log("test 1", data)
            if (data.results.length > 0) {
// this checks if we find any data with the search parameters given then throws it to a for loops
                    for (let song of data.results) {
                    renderSong(song)
// this is when the page takes the data it has retrieved and calls the function towards the bottom
// with the data given and then iterating on each array inside the object array of data
                    console.log("test 2", data.results[0].artistName)
                    }    
            } else {
// if we get no data for our search this function is called
                    noResults()
            }
        })
        .catch(error => {
// this function is looking for errors before it performs it's task
            console.log(error)
            showError()
        })
    }


function renderSong(song) {
// this section is much more intimidating than it actually is after broken up
    let songDiv = document.createElement('div')
// creating a div element to house all the incoming elements and values we will want to store
// in one location and so when iterated upon multiple times each result will have the same 
// types of information between them all
    songDiv.className = 'song-card'
// giving this variable a class name to have a way to call it in other sections
    songDiv.id = song.trackName
// giving that div element a way to be connected with the object array's trackName key

    let songBox = document.createElement('div')
    songBox.className = 'song-box'
// this div allows me to seperate my information or imgs visually but to keep them together
// as one single iteration of data extracted

    let songInfo = document.createElement('div')
    songInfo.className = 'song-info'
// same as above

    let songArtist = document.createElement('p')
    songArtist.className = "song-artist"
    songArtist.innerHTML = `${song.artistName} - artist`
// this chunk holds a <p> tag for the artist name to go in then it gives it a class name that
// I can call upon and apply changes to every artist name no matter how many iterations are done
// then inside of that <p> I give it a variable to be filled by the appropriate data inside
// the object array that I have from the fetch request

    let songName = document.createElement('p')
    songName.className = 'track-name'
    songName.innerHTML = `${song.trackName} - track name`
// same as above but with track name

    let songAlbum = document.createElement('p')
    songAlbum.className = 'song-album'
    songAlbum.innerHTML = `${song.collectionName} - album`
// same as above but with album name

    let songImg = document.createElement('div')
    songImg.className = 'song-image'
    songImg.innerHTML = `<img src="${song.artworkUrl100}">`
// this is where the album image is stored, as with the others above we have a <div> this time instead
// then give it a class name and then a template literal to call the exact img source we are given
// from the object array from the fetch
    
    let songAudio = document.createElement('div')
    songAudio.innerHTML = `<button class="start-music" data-song-url="${song.previewUrl}">Play!</button>`
// this is where the audio preview for the object array is stored but not where we will be playing
// the audio from. This just allows us to store this variable inside of a button that we can
// connect to an audio player later on but also so that we always have a place that holds the
// previewUrl object array key for each song iteration in the fetch request

    songAudio.addEventListener('click', event => {
// here we will be calling that songAudio variable and giving it an event to listen for
        console.log(event.target.dataset.songUrl)
        songPlayer.src = event.target.dataset.songUrl
// this is identifying that we want the songPlayer we established in the global scope to hold on
// to some data depending on what we click on. In this case that means when we press the button
// it will send the previewUrl straight to the songPlayer so that it can play the chosen song
        songPlayer.volume = .5
// setting the default volume for the player so as not to blast your ears
        songPlayer.autoplay = true
// setting the default behavior of the player so that as soon as it is given an audio it will play it
// immediately
    })


    songInfo.appendChild(songArtist)
    songInfo.appendChild(songName)
    songInfo.appendChild(songAlbum)
// just placing variables inside of a div to hold it all at once
    
    songBox.appendChild(songInfo)
    songBox.appendChild(songImg)
// same as above    

    songDiv.appendChild(songBox)
    songDiv.appendChild(songAudio)
// this is combing all that info into one container to hold each song data sets in one place

    songSection.appendChild(songDiv)
// this takes those multiple iterations and puts them in one container, controlling where exactly
// every current and future iteration will be moved to

}



function clearInputs() {
    let songs = document.querySelectorAll('.song-card')
// selects all elements inside the div called class = 'song-card' that we make inside the renderSong
// function
    for (let song of songs)

        song.remove()
        
// this takes all those selected elements and removes them so we have a way to clear the page of
// past user inputs
}

// works just like with the clearInputs function, just with error messages instead
function clearError() {
    let errors = document.querySelectorAll('.error-message')

    for (let error of errors)
        error.remove()
        
}


//! SSSSSHHHHHH don't tell nobody
function showError() {
    let errorTroll = document.createElement('div')
    errorTroll.className = 'error-message'
    let errorMsg = document.createElement('p')
    let errorRick = document.createElement('div')
    errorMsg.innerHTML = "You got an error! what would Rick do?! Try again of course!"
    errorRick.innerHTML = `<video controls autoplay='true' src="https://video-ssl.itunes.apple.com/itunes-assets/Video118/v4/04/b5/e3/04b5e334-fbcf-5f26-e981-8de20fd4b76d/mzvf_4028901463979513279.640x464.h264lc.U.p.m4v">`
    
    errorTroll.appendChild(errorMsg)
    errorTroll.appendChild(errorRick)

    songSection.appendChild(errorTroll)
}

function noResults() {
    let errorTroll = document.createElement('div')
    errorTroll.className = 'error-message'
    let errorMsg = document.createElement('p')
    let errorRick = document.createElement('div')
    errorMsg.innerHTML = "You found no results! what would Rick do?! Try again of course!"
    errorRick.innerHTML = `<video controls autoplay='true' src="https://video-ssl.itunes.apple.com/itunes-assets/Video118/v4/04/b5/e3/04b5e334-fbcf-5f26-e981-8de20fd4b76d/mzvf_4028901463979513279.640x464.h264lc.U.p.m4v">`
    
    errorTroll.appendChild(errorMsg)
    errorTroll.appendChild(errorRick)

    songSection.appendChild(errorTroll)
}