const img = document.getElementById('img');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;
let unqId;



const songs = [{
        title: 'Guleba',
        artist: 'Anirudh Ravichandran',
        imgPath: 'https://img.freepik.com/premium-vector/party-time-illustration_22415-1150.jpg?size=626&ext=jpg',
        discPath: 'music/song3.mp3',
    },
    {
        title: 'private Party',
        artist: 'M.C. Vickey',
        imgPath: 'https://img.freepik.com/free-vector/music-festival-background-with-notes-frame_1017-19499.jpg',
        discPath: 'music/song2.mp3',
        //https://img.freepik.com/free-vector/abstract-speaker-background_1048-2038.jpg
    },
    {
        title: 'Stereo Hearts',
        artist: 'Gym Class Heroes',
        imgPath: 'https://img.freepik.com/premium-vector/spectrum-music-wave-background-modern-pulse-music-player-technology-audio-colorful-round-wave-black-background-vector-digital-waveform-illustration_114333-552.jpg',
        discPath: 'music/song1.mp3',
    },
    {
        title: 'Oy..Oy..',
        artist: 'Siddharth',
        imgPath: 'https://img.freepik.com/premium-vector/music-equalizer-purple-gradient_1172-753.jpg',
        discPath: 'music/song2.mp3',
        //https://img.freepik.com/free-vector/musical-background_1035-320.jpg?size=626&ext=jpg
    },
];

let count = 0;

window.addEventListener('load', function() {
    loadSong(songs[songIndex]);
})


function loadSong(song) {
    var dur = 0;
    img.src = song.imgPath;
    disc.src = song.discPath;
    title.textContent = song.title;
    artist.textContent = song.artist;
    disc.addEventListener('canplaythrough', function() {
        dur = disc.duration
        mins = Math.floor(Math.abs(dur / 60))
        mins = String(mins).padStart('2', 0)
        sec = Math.floor(dur - (parseInt(mins) * 60))
        sec = String(sec).padStart('2', 0)
        duration.textContent = `${mins}:${sec}`
    })
}


function countUpdates() {
    unqId = setInterval(
        function counter() {
            count += 1;
            if (count < 10) {
                timer.textContent = `0:0${count}`;
            } else {
                timer.textContent = `0:${count}`;
            }

        }, 1000);
};

function playPauseMedia() {
    countUpdates();
    clearInterval(unqId);
    if (disc.paused) {
        disc.play();


    } else {
        disc.pause();


    }
}


function updatePlayPauseIcon() {
    count = 0;
    if (disc.paused) {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    } else {
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
}


function updateProgress() {
    progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

    let minutes = Math.floor(disc.currentTime / 60);
    let seconds = Math.floor(disc.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timer.textContent = `${minutes}:${seconds}`;
}


function resetProgress() {
    progress.style.width = 0 + '%';
    timer.textContent = '0:00';
}


function gotoPreviousSong() {
    count = 0;
    clearInterval(unqId);
    countUpdates();
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex = songIndex - 1;
    }

    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow) {
        playPauseMedia();
    }
}


function gotoNextSong(playImmediately) {
    clearInterval(unqId);
    countUpdates();
    count = 0;
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex = songIndex + 1;
    }

    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow || playImmediately) {
        playPauseMedia();
    }
}


function setProgress(ev) {
    const totalWidth = this.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
}


function progressSlider(ev) {
    var is_playing = !disc.paused
    if (is_playing)
        disc.pause()
    const totalWidth = this.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
    if (is_playing)
        disc.play()
    document.addEventListener('mousemove', slideMoving);
    document.addEventListener('mouseup', function() {
        if (is_playing)
            disc.play()
        document.removeEventListener('mousemove', slideMoving);
    });

}


function slideMoving(ev) {
    var is_playing = !disc.paused
    if (is_playing)
        disc.pause()
    const totalWidth = progressContainer.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
    if (is_playing)
        disc.play()
}


play.addEventListener('click', playPauseMedia);

disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

prev.addEventListener('click', gotoPreviousSong);

next.addEventListener('click', gotoNextSong.bind(null, false));

progressContainer.addEventListener('mousedown', progressSlider);
