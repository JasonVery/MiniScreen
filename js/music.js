// This file handles all things related to the music player
document.addEventListener("DOMContentLoaded", async function () {
    // Check if there is a stored music user token
    const storedToken = localStorage.getItem('musicUserToken');

    // Config instance of music player
    // This is right from the musickit docs
    try {
        await MusicKit.configure({
            developerToken: "",
            app: {
                name: "miniScreen",
                build: "1.0.0"
            },
            // Check if a token is already available and set it directly to avoid re-authentication
            musicUserToken: storedToken || null
        });
        // Catch config error
    } catch (err) {
        console.log("Error: ", err);
        return;
    }

    // Check if musickit is loaded
    console.log("Muisckit loaded");

    // Get instance of musickit and get authorization 
    const music = MusicKit.getInstance();

    if (!music) {
        console.log("No musickit instance");
        return;
    }

    // If no stored token is available, authorize and store the token
    if (!storedToken) {
        await music.authorize().then(() => {
            // Check if authorization was successful
            console.log("Authorized");

            // Store the music user token in local storage for future use
            localStorage.setItem('musicUserToken', music.musicUserToken);

            // Listen for changes in the current song to update the info
            // seems to work fine may need to be reworked
            music.addEventListener('mediaItemStateDidChange', () => {
                updateSongInfo(music);
            });

            // Handle playlist selections
            setupPlaylistControls(music);
        });
    } else {
        // Token is already available, so no need to re-authorize
        console.log("Using stored token");

        // Listen for changes in the current song to update the info
        music.addEventListener('mediaItemStateDidChange', () => {
            updateSongInfo(music);
        });

        // Handle playlist selections
        setupPlaylistControls(music);
    }

    // Media Controls appear to work just fine
    document.getElementById("playPause").addEventListener("click", async function () {
        const playPause = document.getElementById("playPauseImg");
        if (music.isPlaying) {
            playPause.src = "../assets/mediaControls/icons8-play-100.png";
            music.pause();
        } else {
            playPause.src = "../assets/mediaControls/icons8-pause-100.png";
            music.play();
        }
    });

    document.getElementById("prevSong").addEventListener("click", async function () {
        music.skipToPreviousItem();
    });

    document.getElementById("nextSong").addEventListener("click", async function () {
        music.skipToNextItem();
    });
});

// Function to handle playlist controls
function setupPlaylistControls(music) {
    // This is just all copied and pasted, probs a better way to do this will clean up later
    // Not sure if i need to though as this will most likely be a fixed amount
    // Playlists
    document.getElementById("radio").addEventListener("click", async function () {
        try {
            await music.setQueue({
                station: "ra.q-GAI6IGIzMzA2NGI5OTJlZmRjYmIxYWJiNzBmZjc1N2FhOTVm"
            });

            music.play();
            console.log("Playing radio");
        } catch (err) {
            console.log("error playing song: ", err);
        }
    });

    document.getElementById("country").addEventListener("click", async function () {
        try {
            await music.setQueue({
                playlist: "p.06aWgd8I0qL7pdz"
            });

            // All playlists are shuffled (Personal preference)
            music.shuffle = true;
            music.play();
            console.log("Playing country");
        } catch (err) {
            console.log("error playing song: ", err);
        }
    });

    document.getElementById("everyday").addEventListener("click", async function () {
        try {
            await music.setQueue({
                playlist: "p.06aWga6C0qL7pdz"
            });

            music.shuffle = true;
            music.play();
            console.log("Playing everyday");
        } catch (err) {
            console.log("error playing song: ", err);
        }
    });

    document.getElementById("chillAtHome").addEventListener("click", async function () {
        try {
            await music.setQueue({
                playlist: "p.xraeD51iM63L9RZ"
            });

            music.shuffle = true;
            music.play();
            console.log("Playing chillAtHome");
        } catch (err) {
            console.log("error playing song: ", err);
        }
    });
}

// This function is called to update all information of the current song
// Info includes song name, artist, and cover art
async function updateSongInfo(music) {
    const currentSong = music.nowPlayingItem;

    if (currentSong && currentSong.attributes) {
        // Requires I fetch a uniform art size 
        const coverArt = MusicKit.formatArtworkURL(currentSong.attributes.artwork, 600, 600);
        document.getElementById("songArtimg").src = coverArt;
        const songName = currentSong.attributes.name;
        document.getElementById("songName").innerHTML = songName;
        const artist = currentSong.attributes.artistName;
        document.getElementById("artist").innerHTML = artist;
    }
}

